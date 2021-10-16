import moment from 'moment';
import idx from 'idx';

export const generateMetadataWithSnapshot = (metadata, snapshot) => {
  if (!snapshot) {
    /* eslint-disable-next-line no-console */
    console.log(`No snapshot exists for ${metadata.name}`);

    return metadata;
  }

  const snapShotDateTimeUnix = Math.floor(snapshot.dateTime / 1000);
  const snapShotDateTime = moment.unix(snapShotDateTimeUnix).utc();
  const now = moment().utc();
  const duration = moment.duration(now.diff(snapShotDateTime));
  const hoursSinceLastSnapshot = duration.asHours();

  if (hoursSinceLastSnapshot > 24) {
    /* eslint-disable-next-line no-console */
    console.log(`No recent snapshot found for ${metadata.name}`);

    return metadata;
  }

  /* eslint-disable-next-line no-console */
  console.log(`Found yesterday's snapshot for ${metadata.name}`);

  const snapshotSnowDepth = idx(snapshot, _ => _.metadata.weather.snowDepth);
  const snowDepth = idx(metadata, _ => _.weather.snowDepth);

  const snapshotNewSnow = idx(snapshot, _ => _.metadata.weather.newSnow);
  const newSnow = idx(metadata, _ => _.weather.newSnow);

  // Somtimes resorts forget to update their snow data
  // here we're trying to rectify their lack of attention
  const outdated = snapshotSnowDepth === snowDepth && snapshotNewSnow === newSnow;

  if (outdated) {
    /* eslint-disable-next-line no-console */
    console.log(`Metdata is outdated for ${metadata.name}. Fixing it`);

    return {
      ...metadata,
      weather: {
        ...metadata.weather,
        newSnow: 0,
      },
    };
  }

  /* eslint-disable-next-line no-console */
  console.log(`Metdata is up-to-date for ${metadata.name}`);

  return metadata;
};
