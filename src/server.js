import Raven from 'raven';
import api from './api';
import * as scheduler from './workers/scheduler';

Raven.config(process.env.SENTRY_URL).install();

const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  /* eslint-disable no-console */
  console.info(`Listening on ${PORT}`);
  /* eslint-enable */
});

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable no-console */
  console.log('Starting scheduler');
  /* eslint-enable */
  scheduler.run();
}
