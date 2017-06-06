import fs from 'fs';
import { fetchNorthstar } from '../northstar';

test('fetches Northstar data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/northstar-weather.html`);

  const resortData = await fetchNorthstar(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 2,
      snowDepthBase: null,
      snowDepthSummit: 0,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchNorthstar('<html></html>');
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
