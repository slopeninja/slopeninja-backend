import Raven from 'raven';
import ResortService from '../../services/ResortService';

const updateSnowLastSeen = async (metadata) => {
  const snowResort = metadata.find(resort => resort.weather.condition === 'snow');
  if (snowResort) {
    const now = new Date();
    const epoch = now.getTime();

    const lastSnow = {
      snowLastSeen: epoch,
    };

    const config = {
      dynamoDbTableName: 'slopeNinjaMetadata',
      dynamoDbPartitionKey: 'id',
    };
    const resortService = new ResortService(config);

    try {
      resortService.storeLastSnow(lastSnow);
    } catch (error) {
      Raven.captureException(error);
    }
  }
};

export default updateSnowLastSeen;
