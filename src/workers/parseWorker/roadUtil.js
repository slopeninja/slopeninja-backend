const CA_ROAD_OPEN = [
  'NO TRAFFIC RESTRICTIONS ARE REPORTED FOR THIS AREA.',
];
const CA_ROAD_INCIDENT = [
  '1-WAY CONTROLLED',
  'REDUCED'
];
const CA_ROAD_CLOSED = ['IS CLOSED'];

const CA_CHAIN_R1 = 'R1';
const CA_CHAIN_R2 = 'R2';
const CA_CHAIN_R3 = 'R3';

export const isCaliforniaRoadClosed = text => {
  const openKeyword = CA_ROAD_CLOSED.find(str => text.includes(str));
  return openKeyword ? true: false;
};

export const isCaliforniaRoadOpen = text => {
  const closedKeyword = CA_ROAD_OPEN.find(str => text.includes(str));
  return closedKeyword ? true: false;
};

export const isCaliforniaRoadIncident = text => {
  const incidentKeyword = CA_ROAD_INCIDENT.find(str => text.includes(str));
  return incidentKeyword ? true: false;
};

export const californiaRoadStatusOrNull = text => {
  const isOpen = isCaliforniaRoadOpen(text);
  const isClosed = isCaliforniaRoadClosed(text);
  const isIncident = isCaliforniaRoadIncident(text);

  if ((isOpen || isIncident) && isClosed) {
    return 'ambiguous';
  }

  if (isIncident) {
    return 'incident';
  }

  if (isOpen) {
    return 'open';
  }

  if (isClosed) {
    return 'closed';
  }

  return null;
};

export const isCaliforniaChainR1 = text => {
  return text.includes(CA_CHAIN_R1) ? true : false;
};

export const isCaliforniaChainR2 = text => {
  return text.includes(CA_CHAIN_R2) ? true : false;
};

export const isCaliforniaChainR3 = text => {
  return text.includes(CA_CHAIN_R3) ? true : false;
};

export const californiaChainStatusOrNull = text => {
  const upperCaseText = text.toUpperCase();
  const R1 = isCaliforniaChainR1(upperCaseText);
  const R2 = isCaliforniaChainR2(upperCaseText);
  const R3 = isCaliforniaChainR3(upperCaseText);

  if (R3) {
    return 'R3';
  }
  if (R2) {
    return 'R2';
  }
  if (R1) {
    return 'R1';
  }
  return null;
}


// export const splitHighwayBody = (text) => {
//   const bodies = {
//   };
//
//   const regex = /^([a-zA-Z]{1,2}\s[0-9]{1,3})\s*$([\S\s]*?)(?=^[a-zA-Z]{1,2}\s[0-9]{1,3}\s*$)/gmi;
//
//   let match = regex.exec(text);
//
//   while (match !== null) {
//
//     const name = match[1];
//     const report = match[2];
//
//     const body = {
//       name,
//       report
//     };
//
//     const key = name.trim().toLowerCase().replace(' ', '');
//
//     bodies[key] = body;
//
//     match = regex.exec(text);
//   }
//
//   return bodies;
// }
