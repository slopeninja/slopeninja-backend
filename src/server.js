import api from './api';
import * as scheduler from './workers/scheduler';

const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  console.log('Starting scheduler');
  scheduler.run();
}
