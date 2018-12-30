import moment from 'moment';
import idx from 'idx';

export const generateMetadataWithSnapshot = (metadata, snapshot) => {
  const snapShotDateTimeUnix = Math.floor(snapshot.dateTime / 1000);
  const snapShotDateTime = moment.unix(snapShotDateTimeUnix).utc();
  const now = moment().utc();
  const duration = moment.duration(now.diff(snapShotDateTime));
  const hoursSinceLastSnapshot = duration.asHours();

  if (hoursSinceLastSnapshot <= 24) {
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
