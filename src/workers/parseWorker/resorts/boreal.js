// import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  statusOrNull,
} from '../util';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temprature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,
};

const parseBoreal = async (data) => {
  if (!data) {
    return {
      ...initialWeather,
    };
  }
  const status = data[10].wrapper_content[0].items[5].body;
  const temprature = data[2].weather_report.forecast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  //24 Hours
  const newSnow24Hr = data[0].snow_report['24_hour'][0];
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();

  const snowDepthSummit = data[0].snow_report.season.Base.base;
  return {
    ...initialWeather,
    status: statusOrNull(status),
    temprature: Number.parseInt(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: Number.parseInt(snowDepthSummit),
  };
}

export const fetchBoreal = async (data = "{}") => {
  let json = JSON.parse(data);

  let weatherData;
  if (json) {
    weatherData = json.default_data;
  }

  const weather = await parseBoreal(weatherData);

  return {
    weather,
  };
}
