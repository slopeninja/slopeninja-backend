import {
  californiaRoadStatusOrNull,
  californiaChainStatusOrNull,
} from '../roadUtil';

export const parseCARoadCondition = (prefix, number) => async (data) => {
  return {
    prefix,
    number,
    status: californiaRoadStatusOrNull(data),
    chainStatus: californiaChainStatusOrNull(data),
  }
}
