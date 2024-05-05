type Props = {
  isMetricNumeric: boolean;
  highestValue: number;
  lowestValue: number;
  metricOptions: (number | string)[];
}

function HeatmapMetricInfo({ isMetricNumeric, lowestValue, highestValue, metricOptions }: Props) {
  if (isMetricNumeric) return (
    <div className="callout mb-1">
      <b>Metric Info</b>
      <div>Highest Value: {highestValue}</div>
      <div>Lowest Value: {lowestValue}</div>
    </div>
  );

  return (
    <div className="callout mb-1">
      <b>Metric Info</b>
      <div>Metric options: {metricOptions.join(', ')}</div>
    </div>
  );
}

export default HeatmapMetricInfo;
