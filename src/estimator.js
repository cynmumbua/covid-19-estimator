const estimatorF = (data) => {
  const input = data;
  let currentlyInfected;

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: Math.floor(currentlyInfected * (2 ** input.timeToElapse / 3))
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: Math.floor(currentlyInfected * (2 ** input.timeToElapse / 3))
    }
  };
};
const covid19ImpactEstimator = (data) => {
  const input = data;
  let periodType;
  if (periodType === 'days') {
    input.timeToElapse *= 7;
    return estimatorF();
  }
  if (periodType === 'months') {
    input.timeToElapse *= 30;
    return estimatorF();
  }
  return estimatorF();
};

export default covid19ImpactEstimator;
