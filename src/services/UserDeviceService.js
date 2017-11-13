import client, { SLOPE_NINJA_DB_SCHEMA } from '../db/client';
import uuid from 'uuid';

class UserDeviceService {
  async getResorts() {
    const userDevices = await client
     .withSchema(SLOPE_NINJA_DB_SCHEMA)
     .select('*')
     .from('userDevices');

    return userDevices;
  }

  async create(deviceName, notificationToken) {
    try {
      const numberOfRowsUpdated = await client
        .table('userDevices')
        .withSchema(SLOPE_NINJA_DB_SCHEMA)
        .insert({
          id: uuid.v4(),
          deviceName,
          notificationToken,
        });
    } catch (error) {
      console.error('Failed to update data for', deviceName, error);
    }
  }
}

export default UserDeviceService;
