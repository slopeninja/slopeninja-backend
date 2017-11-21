import createMetadata from '../createMetadata';

const SQUAW_INPUT_DATA_SAMPLE = {
  'squaw-valley': {
    weather: {
      weatherIcon: 'clear',
      temperature: 61
    },
    snow: {
      status: null,
      weatherIcon: 'sunny',
      temperature: 59,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null
    },
    liftCounts: {
      total: null,
      open: 5
    },
    trailCounts: {
      total: null,
      open: 12
    },
    lifts: [
      {
        name: 'Aerial Tram',
        status: 'on hold',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Funitel',
        status: 'on hold',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Exhibition',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Far East Express',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'First Venture',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'KT22 Express',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Olympic Lady',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Red Dog',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Squaw Creek',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Squaw One Express',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Boon',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Murphy',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'SnoVentures Carpet',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Tucker',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: 'Wylee',
        status: 'closed',
        category: 'Lifts-Lower Mountain'
      },
      {
        name: "Bailey's Beach",
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Belmont',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Big Blue Express',
        status: 'on hold',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Broken Arrow Lift',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Emigrant',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Gold Coast Express',
        status: 'on hold',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Granite Chief Lift',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Headwall Express',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Mountain Meadow',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Shirley Express',
        status: 'on hold',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Siberia Express',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Silverado',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Solitude',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'The Pulley',
        status: 'closed',
        category: 'Lifts-Upper Mountain'
      },
      {
        name: 'Mini-snowmobile',
        status: 'closed',
        category: 'SnoVentures'
      },
      {
        name: 'Snow Tubing',
        status: 'closed',
        category: 'SnoVentures'
      }
    ],
    trails: [
      {
        name: 'Broken Arrow',
        status: 'closed',
        category: 'Broken Arrow',
        level: 'advanced'
      },
      {
        name: 'Powerline Face',
        status: 'closed',
        category: 'Broken Arrow',
        level: 'advanced'
      },
      {
        name: 'Swale',
        status: 'closed',
        category: 'Broken Arrow',
        level: 'advanced'
      },
      {
        name: 'Tower 16',
        status: 'closed',
        category: 'Broken Arrow',
        level: 'advanced'
      },
      {
        name: 'Easy Street',
        status: 'closed',
        category: 'Exhibition',
        level: 'intermediate'
      },
      {
        name: "Julia's Gold",
        status: 'closed',
        category: 'Exhibition',
        level: 'intermediate'
      },
      {
        name: 'Eagle Pass',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'beginner'
      },
      {
        name: 'Ramp Run',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'beginner'
      },
      {
        name: 'Riviera',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'beginner'
      },
      {
        name: 'Snow Flower',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'beginner'
      },
      {
        name: 'To Shirley/High Camp',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'beginner'
      },
      {
        name: 'Emigrant',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'intermediate'
      },
      {
        name: 'Emigrant Face',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'intermediate'
      },
      {
        name: 'Gold Coast Face',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'intermediate'
      },
      {
        name: 'Monument Ridge',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'intermediate'
      },
      {
        name: 'Mystery',
        status: 'open',
        category: 'Goldcoast/Emigrant',
        level: 'intermediate'
      },
      {
        name: 'Funnel',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'advanced'
      },
      {
        name: 'Mainline Pocket',
        status: 'closed',
        category: 'Goldcoast/Emigrant',
        level: 'advanced'
      },
      {
        name: 'The Attic',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Arete',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Bottleneck Gully',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Break It Out',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Granite Alley',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Granite Chief Peak',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Granite Glades',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Hidden Bowl',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'High Voltage',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Magoos',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Main Backside',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Shirley Access',
        status: 'closed',
        category: 'Granite Chief',
        level: 'advanced'
      },
      {
        name: 'Newport',
        status: 'closed',
        category: 'Headwall',
        level: 'intermediate'
      },
      {
        name: 'Bullet',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Classic',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Cornice Bowl',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Garbage Chutes',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Headwall Face',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Hogsback',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Horse Trails',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Hourglass',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: "Norm's",
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'North Bowl',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Sun Bowl',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'The Slot',
        status: 'closed',
        category: 'Headwall',
        level: 'advanced'
      },
      {
        name: 'Larkspur',
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: 'Lupine',
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: 'Monkey Flower',
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: "Mule's Ear",
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: 'Poppy',
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: 'Shooting Star',
        status: 'closed',
        category: 'High Camp Beginner',
        level: 'beginner'
      },
      {
        name: 'Saddle',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Chute 75',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Dead Tree',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Enchanted Forest',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'GS Bowl',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: "Heidi's",
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: "Heidi's Glades",
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'KT Backcountry Gate',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: "Moseley's",
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Nose',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Red Dog Ridge',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Rock Garden',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Saddle Face',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Schimmelpfennig Bowl',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Strawberry Fields',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: "Tamara's",
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'The Fingers',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'W Face Alternates',
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: "Women's Downhill",
        status: 'closed',
        category: 'KT-22',
        level: 'advanced'
      },
      {
        name: 'Easy Slider',
        status: 'closed',
        category: 'Mountain Run',
        level: 'beginner'
      },
      {
        name: 'Home Run',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Juniper Spire',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Mountain Run',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Olympic High',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Packers',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Sunnyside',
        status: 'closed',
        category: 'Mountain Run',
        level: 'intermediate'
      },
      {
        name: 'Spring Bowl',
        status: 'closed',
        category: 'Mountain Run',
        level: 'advanced'
      },
      {
        name: 'Champs Elysees',
        status: 'closed',
        category: 'Red Dog',
        level: 'intermediate'
      },
      {
        name: 'Christmas Tree',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: "Cushman's",
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Dog Leg',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Lower Dog Leg',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Lwr Champs Elysees',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Poulsens Gully',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Red Dog Face',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: 'Upper Dog Leg',
        status: 'closed',
        category: 'Red Dog',
        level: 'advanced'
      },
      {
        name: "Atkinson's 3rd",
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: 'Freeway',
        status: 'closed',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: "Hill's 2nd",
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: "Marrilac's 5th",
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: 'Rainbow Bowl',
        status: 'closed',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: 'Shirley Bowl',
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: "Standteiner's 4th",
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: 'To Solitude',
        status: 'closed',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: "Tomlinson's 1st",
        status: 'open',
        category: 'Shirley/Solitude',
        level: 'intermediate'
      },
      {
        name: "Reuter's 6th",
        status: 'closed',
        category: 'Shirley/Solitude',
        level: 'advanced'
      },
      {
        name: 'Racers',
        status: 'closed',
        category: 'Siberia',
        level: 'intermediate'
      },
      {
        name: 'Siberia Ridge Run',
        status: 'closed',
        category: 'Siberia',
        level: 'intermediate'
      },
      {
        name: 'Siberia Run',
        status: 'closed',
        category: 'Siberia',
        level: 'intermediate'
      },
      {
        name: 'Yellow Trail',
        status: 'closed',
        category: 'Siberia',
        level: 'intermediate'
      },
      {
        name: 'Chimney',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Extra',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Main',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'National',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Red Trail',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Siberia Bowl',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Siberia Ridge',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: 'Upper Sun Bowl',
        status: 'closed',
        category: 'Siberia',
        level: 'advanced'
      },
      {
        name: "Bailey's Cirque",
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: "Billy's",
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Far Side',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Fatal Attraction',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 1',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 2',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 3',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 4',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 5',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 6',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 7',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Gate 8',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Hanging Gardens',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: "Jake's",
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Kathmandu',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Land Bridge',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Medusa',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Oregon Trail',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Trail 90',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Tram Bowl',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Waimea',
        status: 'closed',
        category: 'Silverado',
        level: 'advanced'
      },
      {
        name: 'Pioneer',
        status: 'closed',
        category: 'SnoVentures',
        level: 'beginner'
      },
      {
        name: 'Start Me Up',
        status: 'closed',
        category: 'SnoVentures',
        level: 'beginner'
      },
      {
        name: 'Lake View',
        status: 'closed',
        category: 'Squaw Creek',
        level: 'intermediate'
      },
      {
        name: 'Valley View',
        status: 'closed',
        category: 'Squaw Creek',
        level: 'intermediate'
      },
      {
        name: 'Knob Hill',
        status: 'closed',
        category: 'Squaw Creek',
        level: 'advanced'
      },
      {
        name: 'Montezumas',
        status: 'closed',
        category: 'Squaw Creek',
        level: 'advanced'
      },
      {
        name: 'Strainer',
        status: 'closed',
        category: 'Squaw Creek',
        level: 'advanced'
      }
    ],
    roads: [
      {
        prefix: 'I',
        number: '80',
        status: 'open',
        chainStatus: null
      },
      {
        prefix: 'CA',
        number: '28',
        status: 'open',
        chainStatus: null
      },
      {
        prefix: 'CA',
        number: '89',
        status: 'ambiguous',
        chainStatus: null
      }
    ]
  }
};

const SQUAW_OUTPUT_DATA_SAMPLE = {
  'squaw-valley': {
    logo: '/images/resorts/squaw.svg',
    name: 'Squaw Valley',
    coords: { lat: 39.1969822, lng: -120.2431388 },
    location: 'Olympic Valley, CA 96146',
    status: 'open',
    roads: [
      {
        prefix: 'I',
        number: '80',
        status: 'open',
        chainStatus: null
      },
      {
        prefix: 'CA',
        number: '28',
        status: 'open',
        chainStatus: null
      },
      {
        prefix: 'CA',
        number: '89',
        status: 'ambiguous',
        chainStatus: null
      }
    ],
    weather: {
      base: null,
      newSnow: null,
      condition: 'sunny',
      snowDepth: null,
      temperature: 59
    },
    liftCounts: { open: 0, total: 31 },
    trailCounts: { open: 12, total: 135 }
  }
};

test('can correctly create meta data', () => {
  expect(
    createMetadata('squaw-valley', SQUAW_INPUT_DATA_SAMPLE['squaw-valley'])
  ).toMatchObject(SQUAW_OUTPUT_DATA_SAMPLE['squaw-valley']);
});
