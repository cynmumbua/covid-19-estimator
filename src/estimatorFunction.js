
const estimatorF = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
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

export default (estimatorF);
