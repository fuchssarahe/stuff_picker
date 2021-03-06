const Constants = {
  activityAttributes: [ 'social', 'lazy', 'food', 'alcohol', 'loud', 'thinking', 'free', 'physical' ],
  potentialActivities: [
    { name: 'Netflix night',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: 0,
      loud: -1,
      thinking: -1,
      free: 1,
      physical: -1,
      },
    { name: 'Netflix night with takeout',
      social: 0,
      lazy: 1,
      food: 1,
      alcohol: 0,
      loud: -1,
      thinking: -1,
      free: -1,
      physical: -1
      },
    { name: 'go dancing',
      social: 1,
      lazy: -1,
      food: 0,
      alcohol: 1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: 0
      },
    { name: 'go bar hopping',
      social: 1,
      lazy: -1,
      food: 0,
      alcohol: 1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'play sports',
      social: 1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'go to a local fair/festival',
      social: 0,
      lazy: -1,
      food: 0,
      alcohol: 0,
      loud: 1,
      physical: 0,
      thinking: -1,
      free: 0
      },
    { name: 'go to the museum',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 0,
      thinking: 1,
      free: 0
      },
    { name: 'see a play/musical',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 0,
      free: -1
      },
    { name: 'see a movie in theatres',
      social: 0,
      lazy: 1,
      food: 1,
      alcohol: -1,
      loud: 1,
      physical: 0,
      thinking: -1,
      free: -1
      },
    { name: 'see a live stand-up comedian',
      social: 0,
      lazy: -1,
      food: 0,
      alcohol: 1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: -1
      },
    { name: 'walk in the park',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'go hiking',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'learn a language',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'play with your pet',
      social: -1,
      lazy: 0,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'eat out',
      social: 0,
      lazy: 0,
      food: 1,
      alcohol: 0,
      loud: 0,
      physical: 0,
      thinking: -1,
      free: -1
      },
    { name: 'go bowling',
      social: 1,
      lazy: -1,
      food: 0,
      alcohol: 0,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'bake/cook',
      social: -1,
      lazy: -1,
      food: 1,
      alcohol: -1,
      loud: 0,
      physical: 1,
      thinking: 0,
      free: 1
      },
    { name: 'head to a farmer\'s market',
      social: 0,
      lazy: -1,
      food: 1,
      alcohol: -1,
      loud: 0,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'build a website',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 0,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'take a scenic drive',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'go to goodwill',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: 0
      },
    { name: 'go shopping',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: 0
      },
    { name: 'get a massage',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: -1
      },
    { name: 'browse the internet',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'paint your nails',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'clean the bathroom',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'vacuum',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'knit',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'sew a blanket',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'scuplt with clay',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'play an instrument',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: 1,
      free: 1
      },
    { name: 'play frisbee',
      social: 1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'set up a scavenger hunt',
      social: 1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: 1,
      free: 0
      },
    { name: 'marathon the harry potter movies',
      social: 1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'play DnD',
      social: 1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'play videogames',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'order take-out',
      social: 0,
      lazy: 1,
      food: 1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: -1
      },
    { name: 'stare at the ceiling',
      social: 0,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'stalk people on facebook',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'design your ideal dwelling',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'buy and eat candy',
      social: 0,
      lazy: -1,
      food: 1,
      alcohol: -1,
      loud: 0,
      physical: -1,
      thinking: -1,
      free: -1
      },
    { name: 'go for a run',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 0,
      physical: 1,
      thinking: -1,
      free: 1
      },
    { name: 'hit the gym',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'read a book',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'take a shower',
      social: -1,
      lazy: 1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: -1,
      free: 1
      },
    { name: 'make a list of all the stuff you have to do',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'run errands',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 1,
      physical: 1,
      thinking: 1,
      free: -1
      },
    { name: 'design a roller coaster',
      social: 0,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: -1,
      thinking: 1,
      free: 1
      },
    { name: 'go to a theme park',
      social: 1,
      lazy: -1,
      food: 0,
      alcohol: 0,
      loud: 1,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'take photos',
      social: 1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: 0,
      physical: 1,
      thinking: 1,
      free: 1
      },
    { name: 'learn how to make jam',
      social: 0,
      lazy: -1,
      food: 1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: 1,
      free: -1
      },
    { name: 'have a picnic in the park',
      social: 1,
      lazy: 1,
      food: 1,
      alcohol: 0,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: -1
      },
    { name: 'buy and drop off items for a food drive',
      social: -1,
      lazy: -1,
      food: -1,
      alcohol: -1,
      loud: -1,
      physical: 1,
      thinking: -1,
      free: -1
    },
    { name: 'invite a friend over and ask them to bring beer',
      social: 1,
      lazy: 1,
      food: -1,
      alcohol: 1,
      loud: 0,
      physical: -1,
      thinking: -1,
      free: 1
      }
    ]
  }

  module.exports = Constants;
