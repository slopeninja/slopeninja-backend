import { fetchSierra } from './resorts/sierra';

const resortsFunctions = {
  'sierra': fetchSierra,
  'squaw': fetchSierra
};

const fetchResorts = async () => {
  const resorts = Object.keys(resortsFunctions);

  const arrayOfPromises = resorts.map(async resortName => {
    const fetchFunction = resortsFunctions[resortName];


    const resortData = await fetchFunction();
    return {
      [resortName]: resortData,
    };
  });

  const arrayOfResortData = await Promise.all(arrayOfPromises);

  return arrayOfResortData;
}

const run = async () => {
  console.log('Worker starts');

  const resortsData = await fetchResorts();

  console.log(JSON.stringify(resortsData, null, 2));

  console.log('Worker quits');
}

run();
