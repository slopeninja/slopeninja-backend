import { sortResortsByNewSnowOrSnowDepth } from '../sortResortsByNewSnowOrSnowDepth';

test('sorts resorts by new snow or snow depth', () => {
  const SORTING_INPUT_DATA_SAMPLE = [
    {
      name: 'Diamond Peak',
      weather: {
        newSnow: null,
        snowDepth: null,
      },
      status: 'open',
    },
    {
      name: 'Heavenly',
      weather: {
        newSnow: null,
        snowDepth: null,
      },
      status: 'closed',
    },
    {
      name: 'Sugar Bowl',
      weather: {
        newSnow: null,
        snowDepth: 0,
      },
      status: 'closed',
    },
    {
      name: 'Northstar',
      weather: {
        newSnow: null,
        snowDepth: 121,
      },
      status: 'closed',
    },
    {
      name: 'Boreal',
      weather: {
        newSnow: null,
        snowDepth: 90,
      },
      status: 'closed',
    },
    {
      name: 'Squaw Valley',
      weather: {
        newSnow: 0,
        snowDepth: 149,
      },
      status: 'closed',
    },
    {
      name: 'Sierra',
      weather: {
        newSnow: 2,
        snowDepth: 149,
      },
      status: 'closed',
    },
    {
      name: 'Mt Rose',
      weather: {
        newSnow: 1,
        snowDepth: 133,
      },
      status: 'closed',
    },
    {
      name: 'Kirkwood',
      weather: {
        newSnow: null,
        snowDepth: 133,
      },
      status: 'closed',
    },
  ];
  const SORTING_OUTPUT_DATA_SAMPLE = [
    {
      name: 'Sierra',
      weather: {
        newSnow: 2,
        snowDepth: 149,
      },
      status: 'closed',
    },
    {
      name: 'Mt Rose',
      weather: {
        newSnow: 1,
        snowDepth: 133,
      },
      status: 'closed',
    },
    {
      name: 'Squaw Valley',
      weather: {
        newSnow: 0,
        snowDepth: 149,
      },
      status: 'closed',
    },
    {
      name: 'Kirkwood',
      weather: {
        newSnow: null,
        snowDepth: 133,
      },
      status: 'closed',
    },
    {
      name: 'Northstar',
      weather: {
        newSnow: null,
        snowDepth: 121,
      },
      status: 'closed',
    },
    {
      name: 'Boreal',
      weather: {
        newSnow: null,
        snowDepth: 90,
      },
      status: 'closed',
    },
    {
      name: 'Sugar Bowl',
      weather: {
        newSnow: null,
        snowDepth: 0,
      },
      status: 'closed',
    },
    {
      name: 'Heavenly',
      weather: {
        newSnow: null,
        snowDepth: null,
      },
      status: 'closed',
    },
    {
      name: 'Diamond Peak',
      weather: {
        newSnow: null,
        snowDepth: null,
      },
      status: 'open',
    },
  ];

  const sortedResorts = sortResortsByNewSnowOrSnowDepth(SORTING_INPUT_DATA_SAMPLE);
  expect(sortedResorts).toEqual(SORTING_OUTPUT_DATA_SAMPLE);
});
