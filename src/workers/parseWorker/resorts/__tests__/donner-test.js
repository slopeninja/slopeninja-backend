import fs from 'fs';
import { fetchDonner } from '../donner';

test('fetches Donner data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/donner-weather.html`);

  const resortData = await fetchDonner(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchDonner({});
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
