import { CronJob } from 'cron';

// workers
import { run as runParseWorker } from './parseWorker';
import { run as runNewslettersWorker } from './newslettersWorker';
import { run as runNotificationsWorkerAM } from './notificationsWorker/index-am';
import { run as runNotificationsWorkerPM } from './notificationsWorker/index-pm';

const TIMEZONE = 'America/Los_Angeles';
// const EVERY_SECOND = '* * * * * *';
const EVERY_HALF_HOUR = '*/30 * * * *';
// const EVERY_HOUR = '0 * * * *';
const EVERYDAY_AT_1_PM = '0 13 * * *';
const EVERYDAY_AT_5_AM = '0 5 * * *';
const EVERYDAY_AT_5_PM = '0 17 * * *';

const parserJob = new CronJob(
  EVERY_HALF_HOUR,
  runParseWorker,
  null,
  false, /* Start the job right now */
  TIMEZONE,
);

const newslettersJob = new CronJob(
  EVERYDAY_AT_1_PM,
  runNewslettersWorker,
  null,
  false,
  TIMEZONE,
);

const notificationsAMJob = new CronJob(
  EVERYDAY_AT_5_AM,
  runNotificationsWorkerAM,
  null,
  false,
  TIMEZONE,
);

const notificationsPMJob = new CronJob(
  EVERYDAY_AT_5_PM,
  runNotificationsWorkerPM,
  null,
  false,
  TIMEZONE,
);

export const run = () => {
  parserJob.start();
  newslettersJob.start();
  notificationsAMJob.start();
  notificationsPMJob.start();
};
