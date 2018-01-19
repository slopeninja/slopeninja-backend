import api from './api';
import * as scheduler from './workers/scheduler';
import Raven from 'raven';

Raven.config(process.env.SENTRY_URL).install();

const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  console.info(`Listening on ${PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  console.log('Starting scheduler');
  scheduler.run();
}
