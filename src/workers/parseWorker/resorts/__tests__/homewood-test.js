import fs from 'fs';
import { fetchHomewood } from '../homewood';

test('fetches Homewood data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/homewood-weather.html`);

  const resortData = await fetchHomewood(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: 72,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 81,
      snowDepthSummit: 185,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchHomewood('<html></html>');
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});
