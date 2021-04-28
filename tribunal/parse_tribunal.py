import json
import random

class SummonerNameGenerator():
  prefixes = [
    '', '', '', '', '', '', '', '', '',
    'xX', 'Xx', 'xx',
    'C9 ', 'TSM ', 'SKT '
  ]
  name_part1s = [
    'Tryhard', 'Cursed', 'Sad', 'E', 'ez',
    'Slayer', 'Star', 'Tiny', 'Sad', 'Candy',
    'Blank', 'Elephant', 'Mean', 'Angry',
    'Toxic', 'Shy', 'Flower', 'Oblong', 'Round',
    'Rotund', 'Square', 'Large', 'Fast', 'Quick',
    'Sexy', 'Carrot', 'Broccoli', 'Pipe',
    'Solar', 'Wild', 'Pleasant', 'Beans', 'Oily',
    'Winter', 'Summer', 'Fall', 'Hotel'
  ]
  name_part2s = [
    '', '', '', '', '', '', '', '', '',
    'Egg', 'World', 'Cat', 'Boy', 'Girl',
    'pz', 'Star', 'Lord', 'Sloth', 'Squid',
    'Carbon', 'Bank', 'Penguin', 'Hippo',
    'Toxic', 'Boss', 'Rose', 'Potassium',
    'Wolf', 'Pig', 'Garlic', 'Enigma', 'Owl',
    'Dream', 'Bang', 'Sour', 'Demon', 'Beans',
    'Badger', 'Guava', 'Maize', 'Hospital'
  ]
  suffixes = [
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    'Xx', 'xX', 'xx'
  ]

  def new_name(self):
    prefix = self.prefixes[random.randrange(0, len(self.prefixes))]
    name_part1 = self.name_part1s[random.randrange(0, len(self.name_part1s))]
    name_part2 = self.name_part2s[random.randrange(0, len(self.name_part2s))]
    suffix = self.suffixes[random.randrange(0, len(self.suffixes))]
    return prefix + name_part1 + name_part2 + suffix

if __name__ == '__main__':
  with open('tribunal.txt', 'w') as out_file:
    for i in range(1, 10059):
      try:
        with open('cases/' + str(i) + '.txt', 'r') as in_file:
          data = in_file.read()
      except FileNotFoundError:
        pass

      json_obj = json.loads(data)

      summoner_name_generator = SummonerNameGenerator()
      summoner_names = {}

      out_file.write('<|startoftext|>\n')

      for chat_obj in json_obj['chat_log']:
        timestamp = chat_obj['time']
        all_chat = ''
        if chat_obj['sent_to'] == 'All':
          all_chat  = '[All] '
          include = True
        elif chat_obj['association_to_offender'] != 'enemy':
          include = True
        else:
          include = False
        champion_name = chat_obj['champion_name']
        try:
          summoner_name = summoner_names[champion_name]
        except KeyError:
          summoner_name = summoner_name_generator.new_name()
          summoner_names[champion_name] = summoner_name
        message = chat_obj['message']

        if include:
          out_file.write('[' + timestamp + '] ')
          out_file.write(all_chat)
          out_file.write(summoner_name)
          out_file.write(' (' + champion_name + ')')
          out_file.write(': ' + message)
          out_file.write('\n')

      out_file.write('<|endoftext|>\n')