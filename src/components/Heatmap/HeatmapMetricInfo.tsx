import useHeatmapStore from '@/store/store.ts';

function HeatmapMetricInfo() {
  const { selectedMetricInfo } = useHeatmapStore();

  if (selectedMetricInfo?.isNumeric) return (
    <div className="callout mb-1">
      <b>Selected Metric Info</b>
      <div>Highest Value: {selectedMetricInfo.highestValue}</div>
      <div>Lowest Value: {selectedMetricInfo.lowestValue}</div>
    </div>
  );

  return (
    <div className="callout mb-1">
      <b>Selected Metric Info</b>
      <div>Metric options: {selectedMetricInfo?.metricOptions.join(',')}</div>
    </div>
  );
}

export default HeatmapMetricInfo;
