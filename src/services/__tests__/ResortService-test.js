import ResortService from '../ResortService';
import dummyData from '../dummyData';

test('passes /resorts endpoint returns resorts in db', async () => {
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  expect(resorts).toBe(dummyData.resorts);
});

test('passes /resorts/:resortId endpoint returns one resort', async () => {
  const resort = await new ResortService().findById('81e32949-79e7-43ff-a677-38c1c27c1fe6');

  expect(resort).toBe(dummyData.resorts[0]);
});
