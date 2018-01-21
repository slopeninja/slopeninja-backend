import {
  weatherStatusOrNull,
  numberOrNull,
} from './weatherUtil';

const initialWeather = {
  weatherIcon: null,
  temperature: null,
};

export const parseWeather = async (data) => {
  if (!data.current_observation) {
    return {
      ...initialWeather,
    };
  }
  const weatherIcon = data.current_observation.icon;
  const temperature = Number.parseInt(data.current_observation.temp_f);
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temperature: numberOrNull(temperature),
  };
};
