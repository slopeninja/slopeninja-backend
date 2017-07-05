import cheerio from 'cheerio';

import {
  nevadaRoadStatusOrNull,
  nevadaChainStatusOrNull,
  finalizeNevadaRoadStatus,
} from '../roadUtil';

const parseNVRoadConditionList = (
  $,
  highway
) => {
  const nevadaRoadList = {};

  $('table.gvIncidentList tr').map((index, trElement) => {
    const highwayElements = $(trElement).find('td:nth-child(2)');
    const highwayNameText = $(highwayElements).text().trim().split('-').join('');

    if(!highwayNameText || !highwayNameText.trim().length) {
      return;
    }

    const highwayDescriptionElement = $(trElement).find('td:nth-child(4)');
    const highwayDescription = $(
      highwayDescriptionElement
    ).text().trim();

    const highWayName = Object.keys(nevadaRoadList).find(
      key => key === highwayNameText
    );
    if (highWayName) {
      nevadaRoadList[highWayName].push(highwayDescription);
    } else {
      nevadaRoadList[highwayNameText] = [highwayDescription];
    }
  });

  if (!nevadaRoadList[highway]) {
    return null;
  }

  return nevadaRoadList[highway].join();
}

export const parseNVRoadCondition = (prefix, number) => async ($, url) => {
  // if state road, then the prefix should be normalized to SR
  let normalizedPrefix = prefix === 'NV' ? 'SR' : prefix;

  const name = `${normalizedPrefix}${number}`;

  const filteredData = parseNVRoadConditionList($, name);

  if(!filteredData) {
    return {
      prefix,
      number,
      sourceUrl: url,
      status: 'open',
      chainStatus: null,
    }
  }

  return {
    prefix,
    number,
    sourceUrl: url,
    status: nevadaRoadStatusOrNull(filteredData),
    chainStatus: nevadaChainStatusOrNull(filteredData),
  }
}
