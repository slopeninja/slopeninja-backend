
import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
  resortStatusOrNull,
} from '../weatherUtil';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temperature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,
};

const initialLifts = {
  total: null,
  open: null,
};

const initialTrails = {
  total: null,
  open: null,
};

export const parseSugarSnow = async ($) => {
  const weatherIcon = $('#conditions_status_col_left #conditions_status_col_left_weather .label_small').first().text().trim();
  const status = $('#container_312_outer .h3').first().text().trim();
  const temperature = $('#container_314_outer .conditions_col .table_text_01.c4').first().text().trim();
  // 24 Hours
  const newSnow24Hr = $('#container_313_outer .conditions_col .table_text_01.c4').slice(3, 4).text().trim();
  // Base
  const snowDepthBase = $('#container_314_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  const snowDepthSummit = $('#container_313_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
};

export const parseSugarLiftCounts = async ($) => {
  const open = numberOrNull(Number.parseInt($('.c1 #conditions_status_col_left_openlifts .h3').text().trim()));
  return {
    ...initialLifts,
    open,
  };
};

export const parseSugarTrailCounts = async ($) => {
  return {
    ...initialTrails,
  };
};

export const parseSugarLifts = async ($) => {
  const canonicalLiftNames = [];
  $('.c').map((index, rowElement) => {
    $(rowElement)
      .find('div[class^="conditions_grooming"]')
      .find('div[class^="label_small"]')
      .map((index, nameElement) => {
        const nameText = $(nameElement).text().trim();
        const name = notEmptyStringOrNull(nameText);

        canonicalLiftNames.push(name);
      });
  });

  const blacklist = ['Village Tow', 'Gondola', 'Flume Carpet'];

  const list = [];
  $('.lifts_info').map((index, rowElement) => {
    const nameText = $(rowElement).find('.h3').text().trim();
    let name = notEmptyStringOrNull(nameText);

    if (blacklist.find(liftish => name === liftish)) {
      return;
    }

    // find canonical name
    name = canonicalLiftNames.find(canonicalLiftName => name.indexOf(canonicalLiftName) > -1);

    const statusText = $(rowElement).find('.lifts_status').text().trim();
    const categoryElement = $(rowElement.parent.parent.parent).prev();
    const categoryText = $(categoryElement).find('h2').text().split(':')[1].trim();

    const status = liftTrailStatusOrNull(statusText);
    const category = notEmptyStringOrNull(categoryText);

    const lift = {
      name,
      status,
      category,
    };

    list.push(lift);
  });

  return list;
};

export const parseSugarTrails = async ($) => {
  const list = [];
  $('.c').map((index, rowElement) => {
    let levelElement;

    $(rowElement)
      .find('div[class^="conditions_grooming"]')
      .find('div[class^="runs_"]')
      .filter((index, liftElement) => liftElement.children.length !== 0)
      .map((ii, liftElement) => {
        let statusElement;
        let nameElement;

        if (liftElement.children.length === 5) {
          levelElement = liftElement.children[1];
          statusElement = liftElement.children[3];
          nameElement = liftElement.children[4];
        } else {
          statusElement = liftElement.children[1];
          nameElement = liftElement.children[2];
        }
        const categoryElement = $(liftElement).prevAll('.label_small').get(0);

        const name = notEmptyStringOrNull($(nameElement).text().trim());
        const status = liftTrailStatusOrNull($(statusElement).find('img').attr('src'));
        const level = trailLevelOrNull($(levelElement).find('img').attr('src'));
        const category = notEmptyStringOrNull($(categoryElement).text().trim());

        const trail = {
          name,
          status,
          category,
          level,
        };
        list.push(trail);
      });
  });
  return list;
};
