export const calculateImperialFromMetric = (
  heightMetricMetres: number,
  heightMetricCentimetres: number,
  weightMetric: number
) => {
  const totalHeight = heightMetricMetres * 100 + heightMetricCentimetres;
  const totalWeight = weightMetric;

  const heightImperialFeet = Math.floor(totalHeight / 30.48);
  const heightImperialInches = Math.round((totalHeight % 30.48) / 2.54);
  const weightImperial = Math.round(totalWeight * 2.20462);

  return {
    heightImperialFeet,
    heightImperialInches,
    weightImperial,
  };
};

export const calculateMetricFromImperial = (
  heightImperialFeet: number,
  heightImperialInches: number,
  weightImperial: number
) => {
  const totalHeight = heightImperialFeet * 30.48 + heightImperialInches * 2.54;
  const totalWeight = weightImperial;

  const heightMetricMetres = Math.floor(totalHeight / 100);
  const heightMetricCentimetres = Math.round(totalHeight % 100);
  const weightMetric = Math.round(totalWeight / 2.20462);

  return {
    heightMetricMetres,
    heightMetricCentimetres,
    weightMetric,
  };
};
