import fs from 'fs';
import { fetchSierra } from '../sierra';

test('fetches Sierra data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sierra-weather.html`);

  const resortData = await fetchSierra(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: 43,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 110,
      snowDepthSummit: 211,
    },
    // lifts: {
    //   open: 0,
    //   total: 14,
    // }
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchSierra('<html></html>');
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
