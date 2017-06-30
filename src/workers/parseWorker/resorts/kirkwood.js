import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  resortStatusOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
  removeNumberInFrontOfName,
} from '../weatherUtil';

const initialSnow = {
  status: null,
  weatherIcon: null,
  temprature: null,
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

export const parseKirkwoodSnow = async ($) => {
  const status = $('.snowConditions tr td').first().text().trim();
  // const temprature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.snowReportDataColumn2 .newSnow tbody td').slice(1,2).text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();

  const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialSnow,
    status: resortStatusOrNull(status),
    // temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseKirkwoodLifts = async ($) => {
  const openLifts = Number.parseInt($('.gradBorderModule .terrainConditions .firstItem span').first().text());
  const totalLifts = Number.parseInt($('.gradBorderModule .terrainConditions .firstItem span').slice(1,2).text());

  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
}

export const parseKirkwoodTrails = async ($) => {
  const openTrails = Number.parseInt($('.gradBorderModule .terrainConditions li span').slice(2,3).text());
  const totalTrails = Number.parseInt($('.gradBorderModule .terrainConditions li span').slice(3,4).text());
  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
}

export const parseKirkwoodLiftList = async ($) => {
  const list = [];

  $('#Lifts tbody tr').map((index, rowElement) => {
    const tdElements = $(rowElement).find('td');
    const tdElementName = tdElements[0];

    const tdElementStatus = tdElements[2];

    const thElementCategory = null;

    const rawName = $(tdElementName).text().trim();
    const constructedName = removeNumberInFrontOfName(rawName);
    const name = notEmptyStringOrNull(constructedName);
    const status = liftTrailStatusOrNull($(tdElementStatus).attr('class'));
    const category = notEmptyStringOrNull($(thElementCategory).text().trim());

    const lift = {
      name,
      status,
      category,
    };
    if (lift.name === null) {
      return;
    }
    list.push(lift)
  });

 return list;
}

export const parseKirkwoodTrailList = async ($) => {
  const list = [];

  $('#TerrainStatus tbody td tbody tr').map((index, rowElement) => {
    const tdElements = $(rowElement).find('td');

    const thElementName = tdElements[1];
    const thElementStatus = tdElements[2];
    const thElementLevel = tdElements[0];

    const parentElement = rowElement.parent.parent.parent.parent.parent.parent.parent;
    const thElementCategory = $(parentElement).find('h2');

    const name = notEmptyStringOrNull($(thElementName).text().trim());
    const status = liftTrailStatusOrNull($(thElementStatus).attr('class'));
    const level = trailLevelOrNull($(thElementLevel).attr('class'));
    // const category = notEmptyStringOrNull($(thElementCategory).text().trim());
    const category = null;

    const trail = {
      name,
      status,
      category,
      level,
    };

    if (trail.name === null) {
      return;
    }
    list.push(trail)
  });

 return list;
}
