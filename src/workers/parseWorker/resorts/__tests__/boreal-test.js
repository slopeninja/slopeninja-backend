import fs from 'fs';
import { fetchBoreal } from '../boreal';

test('fetches Boreal data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/fixtures/boreal-weather.json`);

  const resortData = await fetchBoreal(jsonText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: 70,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: 170,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await fetchBoreal("{}");
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

test('fetches all null for no data', async () => {
  const resortData = await fetchBoreal();
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
