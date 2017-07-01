import {
  californiaRoadStatusOrNull,
  californiaChainStatusOrNull,
} from '../roadUtil';

export const parseCARoadCondition = async (data) => {

  return {
    status: californiaRoadStatusOrNull(data),
    chainStatus: californiaChainStatusOrNull(data),
  }
}
