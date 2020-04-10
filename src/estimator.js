import estimatorF from './estimatorFunction';

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
