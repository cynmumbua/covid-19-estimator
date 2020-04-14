import Estimator from './estimatorModel';
// import covid19ImpactEstimator from './estimator';

const estimatorF = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  if (input.periodType === 'weeks') {
    input.timeToElapse *= 7;
  }
  if (input.periodType === 'months') {
    input.timeToElapse *= 30;
  }
  const ici = input.reportedCases * 10;
  impact.currentlyInfected = ici;
  impact.infectionsByRequestedTime = ici * (2 ** Math.trunc((input.timeToElapse / 3)));
  const svi = input.reportedCases * 50;
  severeImpact.currentlyInfected = svi;
  severeImpact.infectionsByRequestedTime = svi * (2 ** Math.trunc((input.timeToElapse / 3)));

  const bedAvailability = input.totalHospitalBeds * 0.35;
  const iInfectionsBRT = impact.infectionsByRequestedTime;
  const siInfectionsBRT = severeImpact.infectionsByRequestedTime;

  impact.severeCasesByRequestedTime = iInfectionsBRT * 0.15;
  const irbt = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(bedAvailability - irbt);

  severeImpact.severeCasesByRequestedTime = siInfectionsBRT * 0.15;
  const sibrt = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(bedAvailability - sibrt);

  impact.casesForICUByRequestedTime = Math.trunc(iInfectionsBRT * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(siInfectionsBRT * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(iInfectionsBRT * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(siInfectionsBRT * 0.02);

  impact.dollarsInFlight = Math.trunc((iInfectionsBRT * input.region.avgDailyIncomePopulation
       * input.region.avgDailyIncomeInUSD) / input.timeToElapse);
  severeImpact.dollarsInFlight = Math.trunc((siInfectionsBRT * input.region.avgDailyIncomePopulation
       * input.region.avgDailyIncomeInUSD) / input.timeToElapse);
  return {
    data,
    impact,
    severeImpact
  };
};

exports.create = (req, res) => {
  const estimator = new Estimator({
    region: ({
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    }),
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  });

  estimator.save()
    .then((data) => {
      res.send({
        message: 'The estimations',
        data: estimatorF(data)
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Something went wrong while estimating.'
      });
    });
};

export default (estimatorF);
