import ResortService from '../../services/ResortService';
import UserDeviceService from '../../services/UserDeviceService';
import NotificationService from '../../services/NotificationService';
import { extractFirstNameFromDeviceName } from './extractFirstNameFromDeviceName';

//3600 is an hour in epoch time
const EPOCH_HOUR = 3600;

const run = async (metadata) => {

  const resortService = new ResortService();
  const lastSnow = await resortService.getSnowMetadata();

  if (lastSnow.snowLastSeen) {
    await resortService.setSnowMetadata({
      snowLastSeen: null,
    });

    const userDeviceService = new UserDeviceService();
    const userDevices = await userDeviceService.getUserDevices();

    const now = new Date();
    const epoch = now.getTime();

    const snowedWithinAnHour = Math.abs(epoch - lastSnow.snowLastSeen) <= EPOCH_HOUR;
    const snowedWithinAnHourMessage = "Hi Five! It's snowing in Tahoe. ❄️"
    const snowedNotWithinAnHourMessage = "It's your lucky day. It snowed in Tahoe."

    const message = snowedWithinAnHour ?
    snowedWithinAnHourMessage :
    snowedNotWithinAnHourMessage;

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    const notifications = userDevices.map(userDevice => {
      const userFirstName = extractFirstNameFromDeviceName(userDevice.deviceName) ?
      ` ${extractFirstNameFromDeviceName(userDevice.deviceName)}` :
      '';

      return ({
        to: userDevice.notificationToken,
        sound: 'default',
        body: `Hey${userFirstName}, ${message}`,
        data: { withSome: 'data' },
      })
    });

    const notificationService = new NotificationService();
    const receipts = await notificationService.broadcast(notifications);

    return receipts;
  }
};

run();
