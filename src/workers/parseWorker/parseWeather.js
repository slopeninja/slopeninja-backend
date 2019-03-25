import {
  weatherStatusOrNull,
  numberOrNull,
} from './weatherUtil';

const initialWeather = {
  weatherIcon: null,
  temperature: null,
};

export const parseWeather = async (data) => {
  if (!data.currently) {
    return {
      ...initialWeather,
    };
  }
  const weatherIcon = data.currently.icon;
  const temperature = Number.parseInt(data.currently.temperature, 10);
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temperature: numberOrNull(temperature),
  };
};
