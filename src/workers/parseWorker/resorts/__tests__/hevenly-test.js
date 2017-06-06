import fs from 'fs';
import { fetchHeavenly } from '../heavenly';

test('fetches Heavenly data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/heavenly-weather.html`);

  const resortData = await fetchHeavenly(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 0,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchHeavenly('<html></html>');
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
