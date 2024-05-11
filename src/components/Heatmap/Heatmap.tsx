import HeatmapWell from '@/components/Heatmap/HeatmapWell.tsx';
import useHeatmapStore from '@/store/store.ts';
import HeatmapMissing from '@/components/Heatmap/HeatmapMissing.tsx';
import classes from './Heatmap.module.css';

function Heatmap() {
  const { formattedHeatmap } = useHeatmapStore();

  if (!formattedHeatmap) return <HeatmapMissing />;

  return (
    <>
      {/*<HeatmapMetricInfo*/}
      {/*  isMetricNumeric={isMetricNumeric}*/}
      {/*  lowestValue={lowestValueInMetric}*/}
      {/*  highestValue={highestValueInMetric}*/}
      {/*  metricOptions={metricOptions}*/}
      {/*/>*/}
      <div
        className={classes.grid}
        style={{
          gridTemplateColumns: `32px repeat(${formattedHeatmap.xAxis.length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${formattedHeatmap.yAxis.length + 1}, minmax(0, 1fr))`,
        }}>
        {formattedHeatmap.table.map((item, index) => {
          if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
            return (
              <HeatmapWell
                key={`data${item.Metadata_Well + index}`}
                item={item}
              />);
          }
          return <div key={`yAxis${item}${index}`}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Heatmap;
