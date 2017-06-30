import {
  californiaRoadStatusOrNull,
  californiaChainStatuaOrNull
} from '../roadUtil';

export const parseCARoadCondition = async (data) => {
  return {
    status: californiaRoadStatusOrNull(data),
    chainStatus: californiaChainStatuaOrNull(data),
  }
}
