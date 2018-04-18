import moment from 'moment';
import idx from 'idx';

export const generateMetadataWithSnapshot = (metadata, snapshot, snapshotTime) => {
  const yesterday = moment()
    .utc()
    .startOf('day')
    .subtract(1, 'days');
  const snapShotDateTimeUnix = Math.floor(snapshot.dateTime || snapshotTime / 1000);
  const isSnapshotFromYesterday = moment
    .unix(snapShotDateTimeUnix)
    .utc()
    .isSame(yesterday, 'd');

  if (isSnapshotFromYesterday) {
    /* eslint-disable no-console */
    console.log(`Found yesterday's snapshot for ${metadata.name}`);
    /* eslint-enable */

    const snapshotSnowDepth = idx(snapshot, _ => _.metadata.weather.snowDepth);
    const snowDepth = idx(metadata, _ => _.weather.snowDepth);

    const outdated = snapshotSnowDepth === snowDepth;

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
