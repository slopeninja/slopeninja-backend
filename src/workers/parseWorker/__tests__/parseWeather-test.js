import fs from 'fs';
import { parseWeather } from '../parseWeather';
import { createJSONParser } from '../parserFactory';

test('fetches weather data from wunderground correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-wg.json.input`);

  const resortData = await createJSONParser('weather', parseWeather)(jsonText);
  expect(resortData).toEqual({
    weather: {
      weatherIcon: 'clear',
      temperature: 72,
    },
  });
});
