import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  // trailLevelOrNull,
  resortStatusOrNull,
} from '../weatherUtil';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temperature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,
};

const initialLifts = {
  total: null,
  open: null,
};

const initialTrails = {
  total: null,
  open: null,
};

export const parseSugarSnow = async ($) => {
  const weatherIcon = $('#conditions_status_col_left #conditions_status_col_left_weather .label_small').first().text().trim();

  const status = $('#conditions_status_col_1 .h3').first().text().trim();

  // const baseCondition = $('#conditions_status_col_right_surfaceconditions .label_small')
  //   .first().text().trim();
  const temperature = $('.conditions_col .table_text_01.c4').slice(6, 7).text().trim();
  // 24 Hours
  const newSnow24Hr = $('.conditions_col').slice(3, 4).text().trim();
  // Base
  const snowDepthBase = $('.conditions_col.conditions_col_break1 .table_text_01.c4').slice(3, 4).text().trim();

  const snowDepthSummit = $('.conditions_col .table_text_01.c4')
    .slice(2, 3)
    .text()
    .trim();

  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
};

export const parseSugarLiftCounts = async ($) => {
  const open = numberOrNull(Number.parseInt(
    $('#conditions_status_col_left_openlifts .h3.c4')
      .first()
      .text()
      .trim(),
    10,
  ));

  return {
    ...initialLifts,
    open,
  };
};

export const parseSugarTrailCounts = async ($) => {
  const open = numberOrNull(Number.parseInt(
    $('#conditions_status_col_left_schedlifts')
      .children('b')
      .text()
      .trim(),
    10,
  ));

  return {
    ...initialTrails,
    open,
  };
};

const SUGAR_BOWL_LIFT_CATEGORIES = {
  'Lincoln Express': 'Village Portal',
  'Disney Express': 'Village Portal',
  'Christmas Tree Express': 'Village Portal',
  'Nob Hill (Beginner)': 'Village Portal',
  "Crow's Peak": 'Village Portal',
  'Village Kids Carpet': 'Village Portal',
  'White Pine (Beginner)': 'Judah Portal',
  'Judah Express': 'Judah Portal',
  'Summit Chair': 'Judah Portal',
  'Jerome Hill Express': 'Judah Portal',
};

export const parseSugarLifts = async ($) => {
  const list = [];
  // use Set to avoid duplicate
  $('#tabs_01_mobile .lifts_3_col_wrapper .lifts_info').each((i, rowElement) => {
    const nameText = $(rowElement)
      .find('div[class^="h3 c2"]')
      .text()
      .trim();
    const name = notEmptyStringOrNull(nameText);

    const blacklist = ['Village Tow', 'Gondola', 'Flume Carpet'];
    if (blacklist.find(liftish => name === liftish)) {
      return;
    }

    const statusText = $(rowElement)
      .find('.lifts_status')
      .text()
      .trim();

    const categoryText = SUGAR_BOWL_LIFT_CATEGORIES[name];

    const status = liftTrailStatusOrNull(statusText);
    const category = notEmptyStringOrNull(categoryText);

    const lift = {
      name,
      status,
      category,
    };

    list.push(lift);
  });

  return list;
};

const SUGAR_BOWL_TRAIL_LIST = [
  {
    category: 'Lincoln Express',
    level: 'expert',
    name: "Fuller's Folly",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'expert',
    name: 'Hidden Gully',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'expert',
    name: 'Sisters',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'expert',
    name: "The '58",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'expert',
    name: 'The Palisades',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Vanderbilt',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'East Face',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Sherpa Creek',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Steilhang',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Steilhang Gully',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Silver Belt Gully',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: "Carl's Nose",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'advanced',
    name: 'Hari-Kari Gully',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Hellman's Chute",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Henderson's Bowl",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Bill Klein's Schuss",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: 'California Street',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: 'Lakeview',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Chick's",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Crowley's",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Crowley's Fingers",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Rahlves' Run (upper)",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: 'Short Cut',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: 'Station B',
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: "Rahlves' Run (lower)",
    status: null,
  },
  {
    category: 'Lincoln Express',
    level: 'intermediate',
    name: 'Union Pacific',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Disney Nose',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Donald Duck',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Eagle',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'East Face',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Hour Glass',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Avalanche',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: "Bacon's Gully",
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Market Street',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: 'Sugar Bowl',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'advanced',
    name: "Nancy's Couloir",
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Overland',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Pony Express',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Montgomery',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Upper MacTavish',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Disney Traverse',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Disney Meadow',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Lonesome Pine',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Lower MacTavish',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'LP Fingers',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: 'Mac R/O',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'intermediate',
    name: "John John's Way",
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'beginner',
    name: 'Meadow Run',
    status: null,
  },
  {
    category: 'Disney Express',
    level: 'beginner',
    name: 'Disney Return',
    status: null,
  },
  {
    category: 'Nob Hill',
    level: 'beginner',
    name: 'Nob Hill Run',
    status: null,
  },
  {
    category: 'Nob Hill',
    level: 'beginner',
    name: 'Union Street',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'advanced',
    name: 'Blitzen',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: 'Upper Ridge',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: "Van Ruiten's Run",
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: 'Chase Ridge',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: 'Mistletoe',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: 'Ridge Run',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'intermediate',
    name: 'Silver Belt Run-out',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: 'Sleigh Ride',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: 'Christmas Tree Lane',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: "Harriet's Hollow",
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: 'Judah Bound',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: 'Comet',
    status: null,
  },
  {
    category: 'Christmas Tree Express',
    level: 'beginner',
    name: 'Catwalk',
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'expert',
    name: "Crow's Face",
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'expert',
    name: "Crow's Nest Glades",
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'expert',
    name: 'The Other One',
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'advanced',
    name: 'Strawberry Fields',
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'advanced',
    name: "Crow's Traverse",
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'advanced',
    name: "Rob's Run",
    status: null,
  },
  {
    category: "Crow's Peak",
    level: 'intermediate',
    name: 'Lower Overland',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'expert',
    name: 'Tunnel 41 Upper',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'advanced',
    name: 'Emigrant Glades',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'advanced',
    name: 'Juniper',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'advanced',
    name: 'Pacific Crest Glades',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Pacific Crest Trail',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Sunset (lower)',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Sunset (upper)',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Golden Gate',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Buena Vista',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Caboose',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Coldstream',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'River Run Gully',
    status: null,
  },
  {
    category: 'Judah Express',
    level: 'intermediate',
    name: 'Tunnel 41 Lower',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'advanced',
    name: "Donner's Way",
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'advanced',
    name: 'Graydon Glades',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'advanced',
    name: "Steamer's",
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: 'Trailblazer',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: 'Emigrant Gap',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: 'Broken Axle',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: "Caleb's Way",
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: 'Central Pacific',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'intermediate',
    name: 'Sidewinder',
    status: null,
  },
  {
    category: 'Jerome Hill Express',
    level: 'beginner',
    name: 'Pioneer Trail',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'expert',
    name: 'Tunnel',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'expert',
    name: 'Gold Rush',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'expert',
    name: 'Railroad Run',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'expert',
    name: 'Century Club',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'expert',
    name: 'Judah Bowl',
    status: null,
  },
  {
    category: 'Summit Chair',
    level: 'advanced',
    name: 'Roller Pass',
    status: null,
  },
  {
    category: 'White Pine',
    level: 'beginner',
    name: 'Black Bear',
    status: null,
  },
  {
    category: 'White Pine',
    level: 'beginner',
    name: 'Learning Zone',
    status: null,
  },
  {
    category: 'White Pine',
    level: 'beginner',
    name: 'Marmot',
    status: null,
  },
  {
    category: 'White Pine',
    level: 'beginner',
    name: 'Parking Return',
    status: null,
  },
  {
    category: 'White Pine',
    level: 'beginner',
    name: 'Pine Marten',
    status: null,
  },
];

export const parseSugarTrails = async ($) => {
  const list = SUGAR_BOWL_TRAIL_LIST.map((trail) => {
    const item = $('#tabs_01_mobile div').filter(() => {
      return $(this).text().trim() === trail.name;
    });

    const status = liftTrailStatusOrNull($(item).prev().find('img').attr('alt'));

    return {
      ...trail,
      status,
    };
  });

  const unfoundStatusCount = list.filter(trail => trail.status === null).length;

  if (unfoundStatusCount === SUGAR_BOWL_TRAIL_LIST.length) {
    return [];
  }

  return list;
};
