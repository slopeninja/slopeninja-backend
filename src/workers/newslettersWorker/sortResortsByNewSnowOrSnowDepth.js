export const sortResortsByNewSnowOrSnowDepth = (resorts) => {
  const sortedResorts = resorts.sort((a, b) => {
    if (a.weather.newSnow === b.weather.newSnow) {
      if (a.weather.snowDepth === null) {
        return 1;
      }
      if (b.weather.snowDepth === null) {
        return -1;
      }
      return b.weather.snowDepth - a.weather.snowDepth;
    }

    if (a.weather.newSnow === null) {
      return 1;
    }
    if (b.weather.newSnow === null) {
      return -1;
    }

    return b.weather.newSnow - a.weather.newSnow;
  });
  return sortedResorts;
};
