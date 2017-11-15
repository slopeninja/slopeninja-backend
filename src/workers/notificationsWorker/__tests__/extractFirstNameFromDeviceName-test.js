import { extractFirstNameFromDeviceName } from '../extractFirstNameFromDeviceName';

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'Julia\'s iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia\'s iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia\'s';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia qiu';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Julia\'s Nexus';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Julia Samsung';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses common name with last name correctly from user device name', () => {
  const deviceName = 'Julia Qiu\'s iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'FYB\'s iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toBeNull();
});

test('parses no name correctly from user device name', () => {
  const deviceName = 'iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toBeNull();
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Birdy\'s iPhone';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toBeNull();
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Nexus';

  const firstName = extractFirstNameFromDeviceName(deviceName);
  expect(firstName).toBeNull();
});

test('parses null correctly from user device name', () => {
  const firstName = extractFirstNameFromDeviceName();
  expect(firstName).toBeNull();
});
