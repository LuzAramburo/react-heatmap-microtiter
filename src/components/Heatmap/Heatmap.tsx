import HeatmapWell from '@/components/Heatmap/HeatmapWell.tsx';
import useHeatmapStore from '@/store/store.ts';
import SelectMetric from '@/components/selectMetric.tsx';

function Heatmap() {
  const { selectedMetric, formattedHeatmap } = useHeatmapStore();

  if (!formattedHeatmap) return <div>Load data for visualization</div>;

  const highestValue = Math.max(...formattedHeatmap.data.map(item => +item[selectedMetric]));
  const lowestValue = Math.min(...formattedHeatmap.data.map(item => +item[selectedMetric]));

  return (
    <>
      <SelectMetric />
      <div>selectedMetric: {selectedMetric}</div>
      <div>Highest: {highestValue}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${formattedHeatmap.xAxis.length}, 1fr)`,
        gridTemplateRows: `repeat(${formattedHeatmap.yAxis.length}, 1fr)`,
      }}>
        {formattedHeatmap.xAxis.map((item, index) => <div key={`xAxis${item + index}`}>{item}</div>)}
        {formattedHeatmap.table.map((item, index) => {
          if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
            return (
              <HeatmapWell
                key={`data${item.Metadata_Well + index}`}
                item={item}
                highestValue={highestValue}
                selectedMetric={selectedMetric}
                lowestValue={lowestValue}
              />);
          }
          return <div key={`yAxis${item}${index}`}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Heatmap;
