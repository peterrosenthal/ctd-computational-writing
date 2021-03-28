import gensim
from gensim.models import Word2Vec
import nltk
import math
import multiprocessing
import random
import re
import sys

def preprocess_text(text):
    text = re.sub(r'[\d+\:\d+]', '', text)
    text = re.sub('[^a-zA-Z0-9]+', '', text)
    text = re.sub(' +', '', text)
    text = re.sub(r'^\s+', '', text)
    text = re.sub(r'\s+$', '', text)
    return text.strip()

def make_training_data(filename, use_stop_words):
    all_text = open(filename, 'r', encoding='utf-8').read()
    out_name = 'train_' + filename
    out = open(out_name, 'w', encoding='utf-8')
    if (use_stop_words):
        stop_words = set(nltk.corpus.stopwords.words('english'))
        for sentence in nltk.word_tokenize(all_text):
            a_sentence = ''
            for word in nltk.word_tokenize(sentence):
                if word.lower() not in stop_words:
                    a_sentence = a_sentence + ' ' + word.lower()
                a_sentence = re.sub(r'^\s+', '', a_sentence)
                out.write(preprocess_text(a_sentence.lower()) + '\n')
    else:
        for sentence in nltk.sent_tokenize(all_text):
            out.write(preprocess_text(sentence.lower()) + '\n')
    return out_name

def train_word2vec(filename):
    data = gensim.models.word2vec.LineSentence(filename)
    return Word2Vec(data, size=10, window=5, min_count=1, workers=multiprocessing.cpu_count())

def get_top_n_neighbors(model, word, n):
    words = []
    for similar, score in model.wv.most_similar(word, topn=n):
        if score > 0:
            words.append(similar)
    return words

def word_from_vec(model, vector):
    words, scores = model.wv.similar_by_vector(vector, topn=2)
    return words[0]

def get_vector_magnitude(vector):
    magnitude = 0
    for component in vector:
        magnitude += component * component
    magnitude = math.sqrt(magnitude)
    return magnitude

def get_descent_neighbor(model, word, target, n):
    words = get_top_n_neighbors(model, word, n)
    lowest_word = ''
    lowest_word_mag = float('inf')
    for similar_word in words:
        magnitude = get_vector_magnitude(model.wv[similar_word] - target)
        if magnitude < lowest_word_mag:
            lowest_word_mag = magnitude
            lowest_word = similar_word
    return lowest_word

def get_average_word(model):
    avg_word = 0
    for word_vector in model.wv.vectors:
        avg_word += word_vector
    avg_word /= len(model.wv.vectors)
    return avg_word
        

def main():
    filename = make_training_data('corpus.txt', True)
    model = train_word2vec(filename)
    target = get_average_word(model)
    word = word_from_vec(model, model.trainables.seeded_vector(random.random() * 10000, vector_size=10))
    if len(sys.argv) > 1:
        word = sys.argv[1]
    poem = word
    num_words = random.randrange(1, 25)
    neighbors = random.randrange(5, 25)
    while num_words > 0:
        word = get_descent_neighbor(model, word, target, neighbors)
        if word in poem:
            neighbors *= 2
            print(neighbors)
        poem += ' ' + word
        num_words -= 1
    print(poem)
    print(word_from_vec(model, target))

if __name__ == '__main__':
    main()