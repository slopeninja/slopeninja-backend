import ResortService from '../../services/ResortService';
import SnapshotService from '../../services/SnapshotService';

/* eslint-disable no-console */
export const run = async () => {
  console.log('snapshotWorker starts');

  const config = {
    tableName: 'slopeNinjaSnapshots',
    partitionKey: 'shortName',
    sortKey: 'dateTime',
  };

  const snapshotService = new SnapshotService(config);
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  const now = Date.now();

  const results = await Promise.all(resorts
    .map(resort => snapshotService
      .storeSnapshot(resort.shortName, now, resort)));

  console.log(`Took snapshots for ${results.length} resorts`);
  console.log('snapshotWorker quits');
};
/* eslint-enable */
