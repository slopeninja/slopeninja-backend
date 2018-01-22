import Raven from 'raven';
import client, { SLOPE_NINJA_DB_SCHEMA } from '../../db/client';

/* eslint-disable no-console */
const updateResort = async (shortName, resort) => {
  try {
    const numberOfRowsUpdated = await client
      .table('resorts')
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .update('metaData', resort)
      .where('shortName', shortName);

    if (numberOfRowsUpdated > 0) {
      console.log('Succesfully updated metadata for', shortName);
    } else {
      console.log(shortName, 'is not in database. Skipped metadata update.');
    }
  } catch (error) {
    console.error('Failed to update metadata for', shortName, error);
    Raven.captureException(error);
  }
};
/* eslint-enable */

export default updateResort;
