const estimatorF = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  const ici = input.reportedCases * 10;
  impact.currentlyInfected = ici;
  impact.infectionsByRequestedTime = ici * Math.floor((2 ** (input.timeToElapse / 3)));
  const svi = input.reportedCases * 50;
  severeImpact.currentlyInfected = svi;
  severeImpact.infectionsByRequestedTime = svi * Math.floor((2 ** (input.timeToElapse / 3)));
  const severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const bedAvailability = input.totalHospitalBeds * 0.35;
  severeImpact.hospitalBedsByRequestedTime = bedAvailability - severeCasesByRequestedTime;
  return {
    data,
    impact,
    severeImpact
  };
};
const covid19ImpactEstimator = (data) => {
  const input = data;
  if (input.periodType === 'weeks') {
    input.timeToElapse *= 7;
  }
  if (input.periodType === 'months') {
    input.timeToElapse *= 30;
  }
  return estimatorF(input);
};

export default covid19ImpactEstimator;
