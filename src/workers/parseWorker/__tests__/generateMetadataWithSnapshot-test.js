import moment from 'moment';
import { generateMetadataWithSnapshot } from '../generateMetadataWithSnapshot';

const SAMPLE_VALID_SNAPSHOT = {
  metadata: {
    id: 'b5f852fd-aae0-4ac2-9cca-0ddea17df2aa',
    shortName: 'boreal',
    logo: '/images/resorts/boreal.svg',
    name: 'Boreal',
    roads: [
      {
        number: '80',
        prefix: 'I',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
        chainStatus: null,
      },
      {
        number: '89',
        prefix: 'CA',
        status: 'closed',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
        chainStatus: null,
      },
      {
        number: '267',
        prefix: 'CA',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
        chainStatus: null,
      },
    ],
    stale: false,
    coords: { lat: 39.332769, lng: -120.347075 },
    status: 'open',
    weather: {
      base: null,
      newSnow: 2,
      condition: 'cloudy',
      snowDepth: 120,
      temperature: 30,
    },
    location: 'Soda Springs, CA 95728',
    liftCounts: { open: 28, total: 34 },
    trailCounts: { open: 28, total: 34 },
  },
};

const SAMPLE_VALID_SNAPSHOT_WITH_UPDATED_METADATA = {
  metadata: {
    id: 'b5f852fd-aae0-4ac2-9cca-0ddea17df2aa',
    shortName: 'boreal',
    logo: '/images/resorts/boreal.svg',
    name: 'Boreal',
    roads: [
      {
        number: '80',
        prefix: 'I',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
        chainStatus: null,
      },
      {
        number: '89',
        prefix: 'CA',
        status: 'closed',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
        chainStatus: null,
      },
      {
        number: '267',
        prefix: 'CA',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
        chainStatus: null,
      },
    ],
    stale: false,
    coords: { lat: 39.332769, lng: -120.347075 },
    status: 'open',
    weather: {
      base: null,
      newSnow: 0,
      condition: 'cloudy',
      snowDepth: 120,
      temperature: 30,
    },
    location: 'Soda Springs, CA 95728',
    liftCounts: { open: 28, total: 34 },
    trailCounts: { open: 28, total: 34 },
  },
};

const SAMPLE_INVALID_SNAPSHOT = {
  dateTime: 1522836800000,
  metadata: {
    id: 'b5f852fd-aae0-4ac2-9cca-0ddea17df2aa',
    shortName: 'boreal',
    logo: '/images/resorts/boreal.svg',
    name: 'Boreal',
    roads: [
      {
        number: '80',
        prefix: 'I',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
        chainStatus: null,
      },
      {
        number: '89',
        prefix: 'CA',
        status: 'closed',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
        chainStatus: null,
      },
      {
        number: '267',
        prefix: 'CA',
        status: 'open',
        sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
        chainStatus: null,
      },
    ],
    stale: false,
    coords: { lat: 39.332769, lng: -120.347075 },
    status: 'open',
    weather: {
      base: null,
      newSnow: 7,
      condition: 'cloudy',
      snowDepth: 120,
      temperature: 30,
    },
    location: 'Soda Springs, CA 95728',
    liftCounts: { open: 28, total: 34 },
    trailCounts: { open: 28, total: 34 },
  },
};

const SAMPLE_METADATA_STALE = {
  logo: '/images/resorts/boreal.svg',
  name: 'Boreal',
  roads: [
    {
      number: '80',
      prefix: 'I',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      chainStatus: null,
    },
    {
      number: '89',
      prefix: 'CA',
      status: 'closed',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      chainStatus: null,
    },
    {
      number: '267',
      prefix: 'CA',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      chainStatus: null,
    },
  ],
  stale: false,
  coords: { lat: 39.332769, lng: -120.347075 },
  status: 'open',
  weather: {
    base: null,
    newSnow: 7,
    condition: 'cloudy',
    snowDepth: 120,
    temperature: 29,
  },
  location: 'Soda Springs, CA 95728',
  liftCounts: { open: 28, total: 34 },
  trailCounts: { open: 28, total: 34 },
};

const SAMPLE_METADATA_UP_TO_DATE = {
  logo: '/images/resorts/boreal.svg',
  name: 'Boreal',
  roads: [
    {
      number: '80',
      prefix: 'I',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      chainStatus: null,
    },
    {
      number: '89',
      prefix: 'CA',
      status: 'closed',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      chainStatus: null,
    },
    {
      number: '267',
      prefix: 'CA',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      chainStatus: null,
    },
  ],
  stale: false,
  coords: { lat: 39.332769, lng: -120.347075 },
  status: 'open',
  weather: {
    base: null,
    newSnow: 3,
    condition: 'cloudy',
    snowDepth: 120,
    temperature: 29,
  },
  location: 'Soda Springs, CA 95728',
  liftCounts: { open: 28, total: 34 },
  trailCounts: { open: 28, total: 34 },
};

const SAMPLE_OUTPUT = {
  logo: '/images/resorts/boreal.svg',
  name: 'Boreal',
  roads: [
    {
      number: '80',
      prefix: 'I',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      chainStatus: null,
    },
    {
      number: '89',
      prefix: 'CA',
      status: 'closed',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      chainStatus: null,
    },
    {
      number: '267',
      prefix: 'CA',
      status: 'open',
      sourceUrl: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      chainStatus: null,
    },
  ],
  stale: false,
  coords: { lat: 39.332769, lng: -120.347075 },
  status: 'open',
  weather: {
    base: null,
    newSnow: 0,
    condition: 'cloudy',
    snowDepth: 120,
    temperature: 29,
  },
  location: 'Soda Springs, CA 95728',
  liftCounts: { open: 28, total: 34 },
  trailCounts: { open: 28, total: 34 },
};

test('compares data from snapshot from yesterday and updates newSnow accordingly', async () => {
  const twoHoursAgo = moment()
    .utc()
    .subtract(2, 'hours');

  const validSnapshot = {
    ...SAMPLE_VALID_SNAPSHOT,
    dateTime: twoHoursAgo,
  };
  expect(generateMetadataWithSnapshot(SAMPLE_METADATA_STALE, validSnapshot)).toEqual(SAMPLE_OUTPUT);

  const validSnapshotWithUpdatedMetadata = {
    ...SAMPLE_VALID_SNAPSHOT_WITH_UPDATED_METADATA,
    dateTime: twoHoursAgo,
  };
  expect(generateMetadataWithSnapshot(
    SAMPLE_METADATA_STALE,
    validSnapshotWithUpdatedMetadata,
  )).toEqual(SAMPLE_OUTPUT);
});

test('returns the original metadata if snapshot is outdated', async () => {
  expect(generateMetadataWithSnapshot(SAMPLE_METADATA_STALE, SAMPLE_INVALID_SNAPSHOT))
    .toEqual(SAMPLE_METADATA_STALE);
});

// since we override newSnow, newSnow in snapshot can mislead the validation for the day after.
// We can just rely on snowDepth for validaion. Thus skipping this test.
test.skip('returns the original metadata if newSnow in snapshot is different from metadata in newSnow', async () => {
  expect(generateMetadataWithSnapshot(SAMPLE_METADATA_UP_TO_DATE, SAMPLE_VALID_SNAPSHOT))
    .toEqual(SAMPLE_METADATA_UP_TO_DATE);
});
