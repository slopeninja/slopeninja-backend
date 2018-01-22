import Expo from 'expo-server-sdk';

class NotificationService {
  constructor() {
    this.expo = new Expo();
  }

  async broadcast(notifications) {
    // const validNotifications = notifications.filter(
    //   notification => Expo.isExpoPushToken(notification.to),
    // );

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    const chunks = this.expo.chunkPushNotifications(notifications);

    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    let receipts = [];
    /* eslint-disable no-restricted-syntax, no-await-in-loop, no-console */
    for (const chunk of chunks) {
      try {
        const receiptsChunk = await this.expo.sendPushNotificationsAsync(chunk);

        console.log('chunk', receiptsChunk);
        receipts = [...receipts, ...receiptsChunk];
      } catch (error) {
        console.error(error);
      }
    }
    /* eslint-enable */

    return receipts;
  }
}

export default NotificationService;
