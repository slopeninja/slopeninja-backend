import {
  isCaliforniaRoadClosed,
  isCaliforniaRoadOpen,
  isCaliforniaRoadIncident,
  californiaRoadStatusOrNull,
  isNevadaRoadClosed,
  isNevadaRoadOpen,
  nevadaRoadStatusOrNull,
} from '../roadUtil';

const I80_CA_SAMPLE_OPEN = `I 80
    [IN THE SAN FRANCISCO BAY AREA - SOLANO CO]
    NO TRAFFIC RESTRICTIONS ARE REPORTED FOR THIS AREA.

    [IN THE NORTHERN CALIFORNIA AREA & SIERRA NEVADA]
    NO TRAFFIC RESTRICTIONS ARE REPORTED FOR THIS AREA.
`;

const US50_CA_SAMPLE_INCIDENT = `
US 50
  [IN THE SACRAMENTO VALLEY & THE LAKE TAHOE BASIN]
  1-WAY CONTROLLED TRAFFIC 5.6 MI EAST OF RIVERTON /AT ALDER CREEK RD/
(EL DORADO CO) FROM 0600 HRS TO 1800 HRS MONDAY THRU THURSDAY THRU 6/29/17
- DUE TO CONSTRUCTION

  IS REDUCED TO 1 LANE IN EACH DIRECTION FROM 3 MI EAST OF POLLOCK PINES TO
1 MI WEST OF RIVERTON /AT BRIDAL VEIL FALLS RD/ (EL DORADO CO) - DUE TO A
SLIPOUT - MOTORISTS ARE SUBJECT TO DELAYS`;

const US89_CA_SAMPLE_INCIDENT = `SR 89
    [IN THE CENTRAL CALIFORNIA AREA & SIERRA NEVADA]
    NO TRAFFIC RESTRICTIONS ARE REPORTED FOR THIS AREA.

    [IN THE NORTHERN CALIFORNIA AREA & SIERRA NEVADA]
    IS CLOSED FROM THE LASSEN VOLCANIC NAT'L PARK SOUTH BDRY TO THE
JCT OF SR 44 /LASSEN LOOP/ (TEHAMA, SHASTA CO) - FOR THE WINTER - MOTORISTS ARE
ADVISED TO USE AN ALTERNATE ROUTE

    1-WAY CONTROLLED TRAFFIC FROM 2 MI SOUTH TO 1.7 MI SOUTH OF
BLISS STATE PARK (EL DORADO CO) FROM 0700 HRS TO 2000 HRS MONDAY THRU
THURSDAY THRU 6/29/17 - DUE TO CONSTRUCTION

    1-WAY CONTROLLED TRAFFIC AT VARIOUS LOCATIONS FROM 2.2 MI NORTH OF THE
EL DORADO/PLACER CO LINE /AT FAWN ST/ TO 2.5 MI NORTH OF THE
EL DORADO/PLACER CO LINE /AT TROUT ST/ FROM 1000 HRS TO 1800 HRS MONDAY THRU
FRIDAY THRU 6/30/17 - DUE TO CONSTRUCTION

    1-WAY CONTROLLED TRAFFIC AT VARIOUS LOCATIONS FROM WARD CREEK TO
SPRUCE AVE /IN TAHOE CITY/ (PLACER CO) FROM 1900 HRS EACH NIGHT TO 1000 HRS
EACH MORNING MONDAY THRU FRIDAY THRU 6/30/17 - DUE TO MAINTENANCE

    1-WAY CONTROLLED TRAFFIC AT VARIOUS LOCATIONS FROM 4.5 MI NORTH OF THE
JCT OF SR 28 /AT TRUCKEE RIVER BRIDGE/ (PLACER CO) TO DONNER PASS RD
/IN TRUCKEE/ (NEVADA CO) FROM 1800 HRS EACH NIGHT TO 0600 HRS EACH MORNING
MONDAY THRU FRIDAY THRU 6/30/17 - DUE TO CONSTRUCTION

    1-WAY CONTROLLED TRAFFIC AT VARIOUS LOCATIONS FROM HOT SPRINGS RD TO
MILL ST /IN GREENVILLE/ (PLUMAS CO) FROM 0700 HRS TO 1800 HRS MONDAY THRU
FRIDAY THRU 6/30/17 - DUE TO CONSTRUCTION`;

const I15_NV_SAMPLE_INCIDENT = `There is construction (Roadwork, Lane Shift) on I-15 in both directions between SR-573/Craig Rd and Speedway Blvd nightly through December 2017, due to road widening. Use cautionin North Las Vegas, Clark County Nevada. Estimated End Time is 2:42 AM on 12/31/17
Current as of: 3/10/2017 12:16:44 PM PST`;

const SR795_NV_SAMPLE_CLOSED = `There is a conditions related event (Road Closed, Water on Roadway) on SR-795 in both directions in Humboldt County from Junction US-95 to Junction SR-289 in Winnemucca. Consider Alternate Route.
Current as of: 5/1/2017 2:04:21 PM PDT`;

test('can correctly detect a CA road as open', () => {
  expect(isCaliforniaRoadOpen(US50_CA_SAMPLE_INCIDENT)).toBe(false);
  expect(isCaliforniaRoadOpen(US89_CA_SAMPLE_INCIDENT)).toBe(true);
  expect(isCaliforniaRoadOpen(I80_CA_SAMPLE_OPEN)).toBe(true);
});

test('can correctly detect is a CA road is closed', () => {
  expect(isCaliforniaRoadClosed(US50_CA_SAMPLE_INCIDENT)).toBe(false);
  expect(isCaliforniaRoadClosed(US89_CA_SAMPLE_INCIDENT)).toBe(true);
  expect(isCaliforniaRoadClosed(I80_CA_SAMPLE_OPEN)).toBe(false);
});

test('can correctly detect is a CA road is incident', () => {
  expect(isCaliforniaRoadIncident(US50_CA_SAMPLE_INCIDENT)).toBe(true);
  expect(isCaliforniaRoadIncident(US89_CA_SAMPLE_INCIDENT)).toBe(true);
  expect(isCaliforniaRoadIncident(I80_CA_SAMPLE_OPEN)).toBe(false);
});

test('can correctly parse CA road status', () => {
  expect(californiaRoadStatusOrNull(US50_CA_SAMPLE_INCIDENT)).toBe('incident');
  expect(californiaRoadStatusOrNull(US89_CA_SAMPLE_INCIDENT)).toBe('ambiguous');
  expect(californiaRoadStatusOrNull(I80_CA_SAMPLE_OPEN)).toBe('open');
});

test('can correctly detect a NV road as open', () => {
  expect(isNevadaRoadOpen(I15_NV_SAMPLE_INCIDENT)).toBe(false);
  expect(isNevadaRoadOpen(SR795_NV_SAMPLE_CLOSED)).toBe(false);
  expect(isNevadaRoadOpen()).toBe(null);
});

test('can correctly detect a NV road as closed', () => {
  expect(isNevadaRoadClosed(I15_NV_SAMPLE_INCIDENT)).toBe(false);
  expect(isNevadaRoadClosed(SR795_NV_SAMPLE_CLOSED)).toBe(true);
  expect(isNevadaRoadClosed()).toBe(null);
});

test('can correctly parse NV road status', () => {
  expect(nevadaRoadStatusOrNull(I15_NV_SAMPLE_INCIDENT)).toBe('incident');
  expect(nevadaRoadStatusOrNull(SR795_NV_SAMPLE_CLOSED)).toBe('closed');
});
