import fs from 'fs';
import { fetchDiamond } from '../diamond';

test('fetches Diamond data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/diamond-weather.html`);

  const resortData = await fetchDiamond(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: 66,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 84,
      snowDepthSummit: 132,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchDiamond('<html></html>');
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
