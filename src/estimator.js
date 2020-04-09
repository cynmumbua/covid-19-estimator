const estimatorF = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  const ici = input.reportedCases * 10;
  impact.currentlyInfected = ici;
  impact.infectionsByRequestedTime = ici * (2 ** Math.floor((input.timeToElapse / 3)));
  const svi = input.reportedCases * 50;
  severeImpact.currentlyInfected = svi;
  severeImpact.infectionsByRequestedTime = svi * (2 ** Math.floor((input.timeToElapse / 3)));

  const bedAvailability = Math.floor(input.totalHospitalBeds * 0.35);

  impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.15);
  const irbt = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.floor(bedAvailability - irbt);

  const severeCasesComputation = Math.floor(severeImpact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = severeCasesComputation;
  const sibrt = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.floor(bedAvailability - sibrt);
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
