import ResortService from '../../services/ResortService';

const updateSnowLastSeen = async (metadata) => {
  const snowResort = metadata.find(resort => resort.weather.condition === 'snow');
  if (snowResort) {
    const now = new Date();
    const epoch = now.getTime();

    const lastSnow = {
      snowLastSeen: epoch,
    };

    const resortService = new ResortService();
    resortService.setSnowMetadata(lastSnow);
  }
};

export default updateSnowLastSeen;
