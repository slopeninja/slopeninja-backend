import fs from 'fs';
import { fetchKirkwood } from '../kirkwood';

test('fetches Kirkwood data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-weather.html`);

  const resortData = await fetchKirkwood(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 10,
      snowDepthBase: null,
      snowDepthSummit: 1,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchKirkwood('<html></html>');
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
