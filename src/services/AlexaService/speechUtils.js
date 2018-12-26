// [Alexa, open Slope Ninja]

// Welcome to Slope Ninja! Here’s your snow update:
// It’s currently 39 degrees Fahrenheit in Lake Tahoe, and it’s snowing at
// Squaw Valley!

// Keep up the snow dance until it spreads to the rest of the mountains around.

// If you’re planning to hit the mountains, currently, chains, or
// all-wheel-drive with snow tires are required on both I-80 and I-50.

// For resort specific information, you can ask me about conditions at your
// favorite ski resort. Happy shredding!

const generateTempSpeech = (/* locale, resorts */) => {
  return 'It’s currently 39 degrees Fahrenheit in Lake Tahoe, and it’s snowing at Squaw Valley!';
};

// [Alexa, ask Slope Ninja for conditions at Sierra-at-Tahoe]

// Here’s your snow update for Sierra-at-Tahoe:

// It’s currently 39 degrees Fahrenheit at Sierra-at-Tahoe.

// The folks at Sierra-at-Tahoe received 4” inches of new snow in the past 24
// hours, adding up to 69 inches of snow depth.

// All of 34 lifts and 20 of 25 trails are open. If you’re planning to hit the
// mountains, currently, parts of I-89 and I-80 are closed.

// Chains or all-wheel-drive with snow tires are required on both I-80 and I-50.

// For more information, go to https://slope.ninja. Happy shredding!

export const generateLaunchSpeech = (locale, resorts) => {
  const tempSpeech = generateTempSpeech(locale, resorts);
  return `Wowza! ${tempSpeech} It's snowing at Sierra-at-Tahoe. With 8 inches of base depth, you will need either a four wheel drive or snow chains.`;
};
