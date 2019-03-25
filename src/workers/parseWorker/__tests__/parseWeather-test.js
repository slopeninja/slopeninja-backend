import fs from 'fs';
import { parseWeather } from '../parseWeather';
import { createJSONParser } from '../parserFactory';

test('fetches weather data from darksky correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/darksky.json.input`);

  const resortData = await createJSONParser('weather', parseWeather)(jsonText);
  expect(resortData).toEqual({
    weather: {
      weatherIcon: 'clear-night',
      temperature: 30,
    },
  });
});
