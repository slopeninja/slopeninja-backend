import cheerio from 'cheerio';

import {
  nevadaRoadStatusOrNull,
  nevadaChainStatusOrNull,
  finalizeNevadaRoadStatus,
} from '../roadUtil';

export const parseNVRoadConditionList = (
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

// FIXME move this to parserFactory
export const filterNevadaHighway = (name) => (htmlText) => {
  const $ = cheerio.load(htmlText, { decodeEntities: true });
  return parseNVRoadConditionList($, name);
};

export const parseNVRoadCondition = async (data) => {

  if(!data) {
    return {
      status: 'open',
      chainStatus: null,
    }
  }

  return {
    status: nevadaRoadStatusOrNull(data),
    chainStatus: nevadaChainStatusOrNull(data),
  }
}
