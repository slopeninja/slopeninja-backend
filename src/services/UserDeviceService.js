import uuid from 'uuid';

import client, { SLOPE_NINJA_DB_SCHEMA } from '../db/client';

// Temporarily disable class-methods-use-this before we fix it across the project
/* eslint-disable class-methods-use-this */

class UserDeviceService {
  async getUserDevices() {
    const userDevices = await client
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .select('*')
      .from('userDevices');

    return userDevices;
  }

  async create(deviceName, notificationToken) {
    const numberOfRowsUpdated = await client
      .table('userDevices')
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .insert({
        id: uuid.v4(),
        deviceName,
        notificationToken,
      });

    return numberOfRowsUpdated;
  }
}

export default UserDeviceService;
