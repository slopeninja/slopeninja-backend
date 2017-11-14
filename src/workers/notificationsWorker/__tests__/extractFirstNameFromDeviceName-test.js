import { extractFirstNameFromDeviceName } from '../extractFirstNameFromDeviceName';

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'Julia\'s iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia\'s iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia\'s';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses common name without last name correctly from user device name', () => {
  const deviceName = 'julia qiu';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Julia\'s Nexus';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Julia Samsung';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses common name with last name correctly from user device name', () => {
  const deviceName = 'Julia Qiu\'s iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toEqual('Julia');
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'FYB\'s iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toBeNull();
});

test('parses no name correctly from user device name', () => {
  const deviceName = 'iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toBeNull();
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Birdy\'s iPhone';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toBeNull();
});

test('parses uncommon name correctly from user device name', () => {
  const deviceName = 'Nexus';

  const userName = extractFirstNameFromDeviceName(deviceName);
  expect(userName).toBeNull();
});
