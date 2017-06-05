import fs from 'fs';
import { fetchMtRose } from '../mtRose';

test('fetches MtRose data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/mtRose-weather.html`);

  const resortData = await fetchMtRose(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: 53,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchMtRose('<html></html>');
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
