import {
  californiaRoadStatusOrNull,
  californiaChainStatusOrNull,
} from '../roadUtil';

export const parseCARoadCondition = (prefix, number) => async (data, url) => {
  return {
    prefix,
    number,
    sourceUrl: url,
    status: californiaRoadStatusOrNull(data),
    chainStatus: californiaChainStatusOrNull(data),
  }
}
