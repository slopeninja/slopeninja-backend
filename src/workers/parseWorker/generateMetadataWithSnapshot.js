import moment from 'moment';
import idx from 'idx';

export const generateMetadataWithSnapshot = (metadata, snapshot) => {
  const yesterday = moment()
    .utc()
    .startOf('day')
    .subtract(1, 'days');
  const snapshopIsFromYesterday = moment(snapshot.dateTime)
    .utc()
    .isSame(yesterday, 'd');

  if (snapshopIsFromYesterday) {
    const snapshotNewSnow = idx(snapshot, _ => _.metadata.weather.newSnow);
    const newSnow = idx(metadata, _ => _.weather.newSnow);

    const snapshotSnowDepth = idx(snapshot, _ => _.metadata.weather.snowDepth);
    const snowDepth = idx(metadata, _ => _.weather.snowDepth);

    const outdated = snapshotNewSnow === newSnow && snapshotSnowDepth === snowDepth;

    if (outdated) {
      return {
        ...metadata,
        weather: {
          ...metadata.weather,
          newSnow: 0,
        },
      };
    }
  }

  return metadata;
};
