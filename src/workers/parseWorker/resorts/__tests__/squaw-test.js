import fs from 'fs';
import { fetchSquaw } from '../squaw';

test('fetches Squaw data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-weather.html`);

  const resortData = await fetchSquaw(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: 52,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 161,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchSquaw('<html></html>');
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
