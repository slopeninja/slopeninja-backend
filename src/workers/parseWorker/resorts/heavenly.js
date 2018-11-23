import {
  inchOrNull,
  liftTrailStatusOrNull,
  trailLevelOrNull,
  numberOrNull,
} from '../weatherUtil';

const initialSnow = {
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

export const extractJSONFromScriptElement = (
  $,
  scriptCue,
  jsonStartCue,
  jsonEndCue,
  bracket,
) => {
  const scriptsWithInlineSourceElements = $('script')
    .filter((index, element) => {
      return (
        element.attribs &&
        !element.attribs.src &&
        // element.attribs.type === 'text/javascript' &&
        element.children &&
        element.children.length > 0 &&
        element.children[0].data
      );
    })
    .toArray();

  const scriptWithInlineSource = scriptsWithInlineSourceElements
    .map(element => element.children[0].data)
    .find(inlineSourceRaw => inlineSourceRaw.includes(scriptCue));

  let jsonDataRaw;
  try {
    const jsonBodyRaw = scriptWithInlineSource
      .split(jsonStartCue)[1]
      .split(jsonEndCue)[0];
    jsonDataRaw = JSON.parse(`${bracket[0]} ${jsonBodyRaw} ${bracket[1]}`);
  /* eslint-disable no-empty */
  } catch (error) {}
  /* eslint-enable */

  return jsonDataRaw;
};

export const parseHeavenlySnow = async ($) => {
  const snowReportData = extractJSONFromScriptElement(
    $,
    'snowReportSettings',
    'FR.snowReportData = {',
    '};',
    ['{', '}'],
  );

  // const forecasts = extractJSONFromScriptElement(
  //   $,
  //   'FR.forecasts = FR.forecasts',
  //   'FR.forecasts || [',
  //   '];',
  //   ['[', ']'],
  // );

  return {
    ...initialSnow,
    // status: resortStatusOrNull(),
    // temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(snowReportData ?
      `${snowReportData.TwentyFourHourSnowfall.Inches} inches` :
      null),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowReportData ?
      `${snowReportData.BaseDepth.Inches} inches` :
      null),
  };
};

export const parseHeavenlyLiftCounts = async ($) => {
  const openLifts = Number.parseInt(
    $('.c118__number1--v1').slice(2, 3).text(),
    10,
  );
  const totalLifts = Number.parseInt(
    $('.c118__number2--v1').slice(2, 3).text().replace('/', ''),
    10,
  );

  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
};

export const parseHeavenlyTrailCounts = async ($) => {
  const openTrails = Number.parseInt(
    $('.c118__number1--v1').slice(3, 4).text(),
    10,
  );
  const totalTrails = Number.parseInt(
    $('.c118__number2--v1').slice(3, 4).text().replace('/', ''),
    10,
  );

  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
};

export const parseHeavenlyLifts = async ($) => {
  const liftsReportData = extractJSONFromScriptElement(
    $,
    'TerrainStatusFeed',
    'FR.TerrainStatusFeed = {',
    '};',
    ['{', '}'],
  );

  let allLifts = [];
  if (liftsReportData) {
    allLifts = liftsReportData.Lifts.map(lift => ({
      name: lift.Name,
      category: lift.Mountain,
      status: liftTrailStatusOrNull(`${lift.Status}`),
    }));
  }
  return allLifts;
};

export const parseHeavenlyTrails = async ($) => {
  const trailsReportData = extractJSONFromScriptElement(
    $,
    'TerrainStatusFeed',
    'FR.TerrainStatusFeed = {',
    '};',
    ['{', '}'],
  );

  let allTrails = [];
  if (trailsReportData) {
    allTrails = trailsReportData.GroomingAreas.reduce((trails, category) => {
      category.Runs.forEach((run) => {
        const trail = {
          name: run.Name,
          status: liftTrailStatusOrNull(`${run.IsOpen}`),
          category: category.Name,
          level: trailLevelOrNull(`${run.Type}`),
        };
        trails.push(trail);
      });

      return trails;
    }, []);

    const trailsExcludingParks = allTrails.filter(trail =>
      !trail.name.includes('Terrain Park'));
    return trailsExcludingParks;
  }

  return allTrails;
};
