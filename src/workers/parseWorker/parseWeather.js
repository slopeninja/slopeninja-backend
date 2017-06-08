import {
  weatherStatusOrNull,
  numberOrNull
} from './util.js';

const initialWeather = {
  weatherIcon: null,
  temprature: null,
};

export const parseWeather = async (data) => {
  if (!data.current_observation) {
    return {
      ...initialWeather,
    };
  };
  const weatherIcon = data.current_observation.icon;
  const temprature = Number.parseInt(data.current_observation.temp_f);
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temprature: numberOrNull(temprature),
  }
}
