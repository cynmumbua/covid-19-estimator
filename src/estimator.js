const estimatorF = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};

  const ici = input.reportedCases * 10;
  impact.currentlyInfected = ici;
  impact.infectionsByRequestedTime = Math.floor(ici * (2 ** input.timeToElapse / 3));
  const svi = input.reportedCases * 50;
  severeImpact.currentlyInfected = svi;
  severeImpact.infectionsByRequestedTime = Math.floor(svi * (2 ** input.timeToElapse / 3));
  return {
    data,
    impact,
    severeImpact
  };
};
const covid19ImpactEstimator = (data) => {
  const input = data;
  let periodType;
  if (periodType === 'weeks') {
    input.timeToElapse *= 7;
  }
  if (periodType === 'months') {
    input.timeToElapse *= 30;
  }
  return estimatorF(data);
};

export default covid19ImpactEstimator;
