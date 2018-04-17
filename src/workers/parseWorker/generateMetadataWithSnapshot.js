import moment from 'moment';
import idx from 'idx';

export const generateMetadataWithSnapshot = (metadata, snapshot) => {
  const yesterday = moment()
    .utc()
    .startOf('day')
    .subtract(1, 'days');
  const snapShotDateTimeUnix = Math.floor(snapshot.dateTime / 1000);
  const isSnapshotFromYesterday = moment
    .unix(snapShotDateTimeUnix)
    .utc()
    .isSame(yesterday, 'd');

  if (isSnapshotFromYesterday) {
    /* eslint-disable no-console */
    console.log(`Found yesterday's snapshot for ${metadata.name}`);
    /* eslint-enable */
    const snapshotNewSnow = idx(snapshot, _ => _.metadata.weather.newSnow);
    const newSnow = idx(metadata, _ => _.weather.newSnow);

    const snapshotSnowDepth = idx(snapshot, _ => _.metadata.weather.snowDepth);
    const snowDepth = idx(metadata, _ => _.weather.snowDepth);

    const outdated = snapshotNewSnow === newSnow && snapshotSnowDepth === snowDepth;

    if (outdated) {
      /* eslint-disable no-console */
      console.log(`Metdata is outdated for ${metadata.name}. Fixing it`);
      /* eslint-enable */
      return {
        ...metadata,
        weather: {
          ...metadata.weather,
          newSnow: 0,
        },
      };
    }

    /* eslint-disable no-console */
    console.log(`Metdata is up-to-date for ${metadata.name}`);
    /* eslint-enable */
  } else {
    /* eslint-disable no-console */
    console.log(`No recent snapshot found for ${metadata.name}`);
    /* eslint-enable */
  }

  return metadata;
};
