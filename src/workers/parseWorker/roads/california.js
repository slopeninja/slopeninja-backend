import {
  californiaRoadStatusOrNull,
  californiaChainStatusOrNull,
} from '../roadUtil';

export const parseCARoadCondition = (prefix, number) => async ($, url) => {
  const text = $('p').text();

  return {
    prefix,
    number,
    sourceUrl: url,
    status: californiaRoadStatusOrNull(text),
    chainStatus: californiaChainStatusOrNull(text),
  };
};
