import { IHeatmapData } from '@/App.tsx';
import insertItemsEveryNItems from '@/utils/insertItemsEveryNItems.ts';
import HeatmapWell from '@/components/Heatmap/HeatmapWell.tsx';
import useHeatmapStore from '@/store/store.ts';
import SelectMetric from '@/components/selectMetric.tsx';

type Props = {
  heatmapData: IHeatmapData;
}

function Heatmap({ heatmapData }: Props) {
  const { selectedMetric } = useHeatmapStore();
  // console.group('Parser');

  console.log('results', heatmapData);
  const data = heatmapData.data;
  // console.log('results.data', data);

  // const metrics = Object.keys(filterPropertiesByNumber(heatmapData.data[0]));
  // console.log('properties', properties);

  const xAxis= ['', ...new Set(heatmapData.data.map(item => item.Metadata_Row))];
  // console.log('xAxis', xAxis);
  const yAxis= [...new Set(heatmapData.data.map(item => item.Metadata_Col))];
  // console.log('yAxis', yAxis);

  const table = insertItemsEveryNItems<string | {[keys: string]: string}>(data, yAxis, xAxis.length - 1);
  // console.log(table);

  // console.groupEnd();

  const highestValue = Math.max(...data.map(item => +item[selectedMetric]));
  const lowestValue = Math.min(...data.map(item => +item[selectedMetric]));

  return (
    <>
      <SelectMetric />
      <div>selectedMetric: {selectedMetric}</div>
      <div>Highest: {highestValue}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${xAxis.length}, 1fr)`,
        gridTemplateRows: `repeat(${yAxis.length}, 1fr)`,
      }}>
        {xAxis.map((item, index) => <div key={`xAxis${item + index}`}>{item}</div>)}
        {table.map((item, index) => {
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
