import {
  generateGeneralWeatherSpeech,
  generateGeneralRoadSpeech,
  generateLaunchSpeech,
  generateSnowConditionsSpeech,
} from '../speechUtils';

import noSnowingResorts from './__fixtures__/noSnowingResorts.json';
import oneSnowingResort from './__fixtures__/oneSnowingResort.json';
import twoSnowingResorts from './__fixtures__/twoSnowingResorts.json';
import threeSnowingComplicatedRoadConditionsWithChainControlsResorts from './__fixtures__/threeSnowingResorts.json';
import sevenSnowingResorts from './__fixtures__/sevenSnowingResorts.json';
import noRoadConditionsResorts from './__fixtures__/noRoadConditionsResorts.json';
import complicatedRoadConditionsNoChainControlResorts from './__fixtures__/complicatedRoadConditionsNoChainControlResorts.json';
import complicatedRoadConditionsWithChainControlResorts from './__fixtures__/complicatedRoadConditionsWithChainControlResorts.json';
import twoSnowingComplicatedRoadConditionsWithChainControlResorts from './__fixtures__/twoSnowingComplicatedRoadConditionsWithChainControlResorts.json';

const LOCALE = 'en-US';

test('generate correct weather speech given and resorts', () => {
  expect(generateGeneralWeatherSpeech(noSnowingResorts)).toEqual('It’s currently 23 degrees Fahrenheit in Lake Tahoe, there are 11 resorts open.');
  expect(generateGeneralWeatherSpeech(oneSnowingResort)).toEqual('It’s currently 23 degrees Fahrenheit in Lake Tahoe, and it’s snowing at Mt Rose!');
  expect(generateGeneralWeatherSpeech(twoSnowingResorts)).toEqual('It’s currently 23 degrees Fahrenheit in Lake Tahoe, Mt Rose and Sugar Bowl with reports of pow and more to come!');
  expect(generateGeneralWeatherSpeech(threeSnowingComplicatedRoadConditionsWithChainControlsResorts)).toEqual("It’s currently 23 degrees Fahrenheit in Lake Tahoe, and it’s getting white all over! It's snowing at Mt Rose, Boreal and Sugar Bowl!");
  expect(generateGeneralWeatherSpeech(sevenSnowingResorts)).toEqual('It’s currently 29 degrees Fahrenheit in Lake Tahoe, Everyone’s abuzz with reports of snow. 7 resorts reports of pow!');
});

test('generate correct road condition speech given and resorts', () => {
  expect(generateGeneralRoadSpeech(noRoadConditionsResorts)).toEqual('If you’re planning to hit the mountains, currently, all roads are open with no chain controls.');

  // eslint-disable-next-line max-len
  expect(generateGeneralRoadSpeech(complicatedRoadConditionsNoChainControlResorts)).toEqual('If you’re planning to hit the mountains, currently, CA-89 is partially closed.');

  // eslint-disable-next-line max-len
  expect(generateGeneralRoadSpeech(complicatedRoadConditionsWithChainControlResorts)).toEqual('If you’re planning to hit the mountains, currently, on NV-431, and I-580, chains, all-wheel-drive or snow tires are required, on I-80, chains or all-wheel-drive with snow tires are required, CA-89 is partially closed.');
});

test('generate correct launch speech given locale and resorts', () => {
  const twoSnowingResortsExpectedOutput =
    'Welcome to Slope Ninja! Here’s your snow update: It’s currently 23 degrees Fahrenheit in Lake Tahoe, Donner Ski Ranch and Squaw Valley with reports of pow and more to come! If you’re planning to hit the mountains, currently, on NV-431, and I-580, chains, all-wheel-drive or snow tires are required, on I-80, chains or all-wheel-drive with snow tires are required, CA-89 is partially closed. For resort specific conditions, you can say "tell me snow conditions at Squaw Valley" or your favorite resort, or, you can say exit... What can I help you with?';
  // eslint-disable-next-line max-len
  expect(generateLaunchSpeech({
    locale: LOCALE,
    resorts: twoSnowingComplicatedRoadConditionsWithChainControlResorts,
  })).toEqual(twoSnowingResortsExpectedOutput);

  const threeSnowingResortsExpectedOutput = 'Welcome to Slope Ninja! Here’s your snow update: It’s currently 23 degrees Fahrenheit in Lake Tahoe, and it’s getting white all over! It\'s snowing at Mt Rose, Boreal and Sugar Bowl! If you’re planning to hit the mountains, currently, on NV-431, chains, all-wheel-drive or snow tires are required, CA-89 is partially closed. For resort specific conditions, you can say "tell me snow conditions at Squaw Valley" or your favorite resort, or, you can say exit... What can I help you with?';
  expect(generateLaunchSpeech({
    locale: LOCALE,
    resorts: threeSnowingComplicatedRoadConditionsWithChainControlsResorts,
  })).toEqual(threeSnowingResortsExpectedOutput);

  const noSnowingResortExpectedOutput = 'Welcome to Slope Ninja! Here’s your snow update: It’s currently 23 degrees Fahrenheit in Lake Tahoe, there are 11 resorts open. If you’re planning to hit the mountains, currently, CA-89 is partially closed. For resort specific conditions, you can say "tell me snow conditions at Squaw Valley" or your favorite resort, or, you can say exit... What can I help you with?';
  expect(generateLaunchSpeech({
    locale: LOCALE,
    resorts: noSnowingResorts,
  })).toEqual(noSnowingResortExpectedOutput);
});

test('generate correct resort specific speech given locale, resorts and resortShortName', () => {
  expect(generateSnowConditionsSpeech({
    locale: LOCALE,
    resorts: noSnowingResorts,
    resortShortName: 'boreal',
  })).toEqual('It’s currently 19 degrees Fahrenheit at Boreal, clear. Boreal has a total of 8 lifts and 34 trails, of which 5 lifts are currently spinning, 34 trails are open. Boreal has a snow depth of 70 inches. If you’re planning to hit the mountains, currently, CA-89 is partially closed. For more information, go to slope.ninja. Happy shredding!');

  expect(generateSnowConditionsSpeech({
    locale: LOCALE,
    resorts: threeSnowingComplicatedRoadConditionsWithChainControlsResorts,
    resortShortName: 'sierra-at-tahoe',
  })).toEqual('It’s currently 33 degrees Fahrenheit at Sierra-at-Tahoe, clear. Sierra-at-Tahoe has a total of 14 lifts and 46 trails, of which 8 lifts are currently spinning, 41 trails are open. Sierra-at-Tahoe has a snow depth of 52 inches. If you’re planning to hit the mountains, currently, CA-89 is partially closed. For more information, go to slope.ninja. Happy shredding!');

  expect(generateSnowConditionsSpeech({
    locale: LOCALE,
    resorts: sevenSnowingResorts,
    resortShortName: 'diamond-peak',
  })).toEqual('It’s currently 29 degrees Fahrenheit at Diamond Peak, clear. Diamond Peak has a total of 7 lifts and 34 trails, of which 6 lifts are currently spinning, 24 trails are open. Diamond Peak has a snow depth of 36 inches. If you’re planning to hit the mountains, currently, all roads are open with no chain controls. For more information, go to slope.ninja. Happy shredding!');
});
