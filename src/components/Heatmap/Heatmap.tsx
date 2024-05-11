import HeatmapWell from '@/components/Heatmap/HeatmapWell.tsx';
import useHeatmapStore, { GenericKeyPairString } from '@/store/store.ts';
import HeatmapMissing from '@/components/Heatmap/HeatmapMissing.tsx';
import getColorHeatmap, { splitNumberIntoRanges } from '@/utils/getColorHeatmap.ts';
import canBeNumber from '@/utils/canBeNumber.ts';
import HeatmapMetricInfo from '@/components/Heatmap/HeatmapMetricInfo.tsx';
import classes from './Heatmap.module.css';

function Heatmap() {
  const { selectedMetric, formattedHeatmap } = useHeatmapStore();

  if (!formattedHeatmap) return <HeatmapMissing />;

  const colors = ['#1d4877', '#1b8a5a', '#fbb021', '#f68838', '#ee3e32'];

  const isMetricNumeric = canBeNumber(formattedHeatmap.data[0][selectedMetric]);
  const metricArray = formattedHeatmap.data.map(item => {
    if (isMetricNumeric) return +item[selectedMetric];
    return item[selectedMetric];
  });

  // If metric is numeric
  const highestValueInMetric = Math.max(...metricArray as number[]);
  const lowestValueInMetric = Math.min(...metricArray as number[]);
  const rangesForMetric = splitNumberIntoRanges(
    colors.length,
    highestValueInMetric,
    lowestValueInMetric,
  );

  const handleColorNumericMetric = (item: GenericKeyPairString) => {
    return getColorHeatmap(+item[selectedMetric], rangesForMetric, colors);
  };

  // If metric is NOT numeric
  const metricOptions = [...new Set(metricArray)];
  const handleColorStringMetric = (item: GenericKeyPairString) => {
    const index = metricOptions.indexOf(item[selectedMetric]);
    return colors[index];
  };

  return (
    <>
      <HeatmapMetricInfo
        isMetricNumeric={isMetricNumeric}
        lowestValue={lowestValueInMetric}
        highestValue={highestValueInMetric}
        metricOptions={metricOptions}
      />
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
                color={isMetricNumeric ? handleColorNumericMetric(item) : handleColorStringMetric(item)}
              />);
          }
          return <div key={`yAxis${item}${index}`}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Heatmap;
