const CA_ROAD_OPEN = [
  'NO TRAFFIC RESTRICTIONS ARE REPORTED FOR THIS AREA.',
];
const CA_ROAD_INCIDENT = [
  '1-WAY CONTROLLED',
  'REDUCED'
];
const CA_ROAD_CLOSED = ['IS CLOSED'];

const CHAIN_R1 = [
  'R1',
  'CHAINS ARE REQUIRED ON ALL VEHICLES EXCEPT 4-WHEEL-DRIVE VEHICLES WITH SNOW'
//   CHAINS ARE REQUIRED ON ALL VEHICLES EXCEPT 4-WHEEL-DRIVE VEHICLES WITH SNOW
// TIRES ON ALL 4 WHEELS
// unicode break between SNOW and TIRES
];
const CHAIN_R2 = 'R2';
const CHAIN_R3 = 'R3';

const NV_ROAD_INCIDENT = [
  'construction',
  'incident',
];
const NV_ROAD_CLOSED = ['Road Closed'];

export const isCaliforniaRoadClosed = text => {
  if(!text) {
    return null;
  }
  const openKeyword = CA_ROAD_CLOSED.find(str => text.includes(str));
  return openKeyword ? true: false;
};

export const isCaliforniaRoadOpen = text => {
  if(!text) {
    return null;
  }
  const closedKeyword = CA_ROAD_OPEN.find(str => text.includes(str));
  return closedKeyword ? true: false;
};

export const isCaliforniaRoadIncident = text => {
  if(!text) {
    return null;
  }
  const incidentKeyword = CA_ROAD_INCIDENT.find(str => text.includes(str));
  return incidentKeyword ? true: false;
};

export const californiaRoadStatusOrNull = text => {
  if(!text) {
    return null;
  }
  const upperCaseText = text.toUpperCase();
  const isOpen = isCaliforniaRoadOpen(upperCaseText);
  const isClosed = isCaliforniaRoadClosed(upperCaseText);
  const isIncident = isCaliforniaRoadIncident(upperCaseText);

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
  return CHAIN_R1.find(condition => text.includes(condition)) ? true : false;
};

export const isCaliforniaChainR2 = text => {
  return text.includes(CHAIN_R2) ? true : false;
};

export const isCaliforniaChainR3 = text => {
  return text.includes(CHAIN_R3) ? true : false;
};

export const californiaChainStatusOrNull = text => {
  if(!text) {
    return null;
  }
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


export const isNevadaRoadClosed = text => {
  if(!text) {
    return null;
  }
  const closedKeyword = NV_ROAD_CLOSED.find(str => text.includes(str));
  return closedKeyword ? true: false;
};

export const isNevadaRoadIncident = text => {
  if(!text) {
    return null;
  }
  const incidentKeyword = NV_ROAD_INCIDENT.find(str => text.includes(str));
  return incidentKeyword ? true: false;
};

export const isNevadaRoadOpen = text => {
  if (text) {
    return false;
  }
  return null;
};

export const nevadaRoadStatusOrNull = text => {
  if(!text) {
    return null;
  }
  const isOpen = isNevadaRoadOpen(text);
  const isClosed = isNevadaRoadClosed(text);
  const isIncident = isNevadaRoadIncident(text);

  if (isIncident && isClosed) {
    return 'ambiguous';
  }

  if (isIncident) {
    return 'incident';
  }

  if (isClosed) {
    return 'closed';
  }

  return null;
};

export const isNevadaChainR1 = text => {
  return text.includes(CHAIN_R1) ? true : false;
};

export const isNevadaChainR2 = text => {
  return text.includes(CHAIN_R2) ? true : false;
};

export const isNevadaChainR3 = text => {
  return text.includes(CHAIN_R3) ? true : false;
};

export const nevadaChainStatusOrNull = text => {
  const upperCaseText = text.toUpperCase();
  const R1 = isNevadaChainR1(upperCaseText);
  const R2 = isNevadaChainR2(upperCaseText);
  const R3 = isNevadaChainR3(upperCaseText);

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

export const splitHighwayBody = (text) => {
  const bodies = {};

  const regex = /^([a-zA-Z]{1,2}\s[0-9]{1,3})\s*$([\S\s]*?)(?=^[a-zA-Z]{1,2}\s[0-9]{1,3}\s*$)/gmi;

  let match = regex.exec(text);

  while (match !== null) {

    const name = match[1];
    const report = match[2];

    const body = {
      name,
      report
    };

    const key = name.trim().toLowerCase().replace(' ', '');

    bodies[key] = body;

    match = regex.exec(text);
  }

  return bodies;
}
