import fs from 'fs';
import { fetchSugar } from '../sugar';

test('fetches Sugar data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sugar-weather.html`);

  const resortData = await fetchSugar(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: 32,
      baseCondition: null,
      newSnow: 7,
      snowDepthBase: 87,
      snowDepthSummit: 195,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchSugar('<html></html>');
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
