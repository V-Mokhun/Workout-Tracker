interface MetricMeasurements {
  heightMetricMetres?: number;
  heightMetricCentimetres?: number;
  weightMetric?: number;
}

interface ImperialMeasurements {
  heightImperialFeet?: number;
  heightImperialInches?: number;
  weightImperial?: number;
}

export const calculateImperialFromMetric = (
  metric: MetricMeasurements
): ImperialMeasurements => {
  const result: ImperialMeasurements = {};

  if (
    metric.heightMetricMetres !== undefined ||
    metric.heightMetricCentimetres !== undefined
  ) {
    const totalHeight =
      (metric.heightMetricMetres || 0) * 100 +
      (metric.heightMetricCentimetres || 0);
    result.heightImperialFeet = Math.floor(totalHeight / 30.48);
    result.heightImperialInches = Math.round((totalHeight % 30.48) / 2.54);
  }

  if (metric.weightMetric !== undefined) {
    result.weightImperial = Math.round(metric.weightMetric * 2.20462);
  }

  return result;
};

export const calculateMetricFromImperial = (
  imperial: ImperialMeasurements
): MetricMeasurements => {
  const result: MetricMeasurements = {};

  if (
    imperial.heightImperialFeet !== undefined ||
    imperial.heightImperialInches !== undefined
  ) {
    const totalHeight =
      (imperial.heightImperialFeet || 0) * 30.48 +
      (imperial.heightImperialInches || 0) * 2.54;
    result.heightMetricMetres = Math.floor(totalHeight / 100);
    result.heightMetricCentimetres = Math.round(totalHeight % 100);
  }

  if (imperial.weightImperial !== undefined) {
    result.weightMetric = Math.round(imperial.weightImperial / 2.20462);
  }

  return result;
};
