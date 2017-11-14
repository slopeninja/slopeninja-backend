import ResortService from '../../services/ResortService';
import UserDeviceService from '../../services/UserDeviceService';
import NotificationService from '../../services/NotificationService';

const run = async (metadata) => {

  const resortService = new ResortService();
  const lastSnow = await resortService.getSnowMetadata();

  if (lastSnow.snowLastSeen) {
    await resortService.setSnowMetadata({
      snowLastSeen: null,
    });

    const userDeviceService = new UserDeviceService();
    const userDevices = await userDeviceService.getUserDevices();

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    const notifications = userDevices.map(userDevice => ({
      to: userDevice.notificationToken,
      sound: 'default',
      body: 'Yay! It\'s snowing in Tahoe',
      data: { withSome: 'data' },
    }));

    const notificationService = new NotificationService();
    const receipts = await notificationService.broadcast(notifications);

    return receipts;
  }
};

run();
