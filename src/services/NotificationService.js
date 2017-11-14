import Expo from 'expo-server-sdk';

class NotificationService {
  constructor() {
    this.expo = new Expo();
  }

  async broadcast(notifications) {
    const validNotifications = notifications.filter(notification => Expo.isExpoPushToken(notification.to));

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = this.expo.chunkPushNotifications(notifications);

    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await this.expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export default NotificationService;
