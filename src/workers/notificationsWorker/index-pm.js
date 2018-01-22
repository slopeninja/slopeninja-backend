import ResortService from '../../services/ResortService';
import UserDeviceService from '../../services/UserDeviceService';
import NotificationService from '../../services/NotificationService';
import { extractFirstNameFromDeviceName } from './extractFirstNameFromDeviceName';

// 3600 is an hour in epoch time
const EPOCH_HOUR = 3600;

const generateMessage = (userDevice, freshSnow = false) => {
  const firstName = extractFirstNameFromDeviceName(userDevice.deviceName);
  // 5AM-4PM
  //      has name? Good news, Julia! More snow landed on the slopes today.
  //          else: Yay! More snow landed on the slopes today.
  // 4PM-5PM
  //      has name? Hey Julia! It's snowing in Tahoe.
  //          else: Mother Nature is at it! It's snowing in Tahoe.

  let greeting = freshSnow ? 'Mother Nature is at it!' : 'Yay!';

  if (firstName) {
    greeting = freshSnow ? `Hey ${firstName}!` : `Good news, ${firstName}!`;
  }

  const freshSnowMessage = `${greeting} It's snowing in Tahoe. ❄️`;
  const defaultMessage = `${greeting} More snow landed on the slopes today.`;

  const message = freshSnow ? freshSnowMessage : defaultMessage;
  return message;
};

/* eslint-disable no-console */
export const run = async () => {
  console.log('notificationsWroker-pm starts');

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

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    const notifications = userDevices.map((userDevice) => {
      const message = generateMessage(userDevice, snowedWithinAnHour);

      return ({
        to: userDevice.notificationToken,
        sound: 'default',
        body: message,
        data: { withSome: 'data' },
      });
    });

    const notificationService = new NotificationService();
    const receipts = await notificationService.broadcast(notifications);

    console.log(receipts);
  }
};
/* eslint-enable */
