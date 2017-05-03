import db from './dummyData';

class ResortService {
  getResorts() {
    const promise = new Promise((resolve, reject) => {
      const resorts = db.resorts;
      setTimeout(() => resolve(resorts), 0);
    });

    return promise;
  }

  async findById(resortId) {
    return db.resorts.find((resort) => resort.id === resortId);
  }
}

export default ResortService;
