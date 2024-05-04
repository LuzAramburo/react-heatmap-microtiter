import { IDataCSV, IHeatmapData } from '@/App.tsx';
import insertItemsEveryNItems from '../../utils/insertItemsEveryNItems.ts';
import HeatmapWell from '@/Heatmap/HeatmapWell.tsx';
import filterPropertiesByNumber from '../../utils/filterMetrics.ts';
import { useState } from 'react';

type Props = {
  heatmapData: IHeatmapData;
}

function Heatmap({ heatmapData }: Props) {
  // console.group('Parser');

  // console.log('results', heatmapData);
  const data = heatmapData.data;
  console.log('results.data', data);

  const metrics = Object.keys(filterPropertiesByNumber(heatmapData.data[0]));
  // console.log('properties', properties);

  const xAxis= ['', ...new Set(heatmapData.data.map(item => item.Metadata_Row))];
  // console.log('xAxis', xAxis);
  const yAxis= [...new Set(heatmapData.data.map(item => item.Metadata_Col))];
  // console.log('yAxis', yAxis);

  const table = insertItemsEveryNItems<string | IDataCSV>(data, yAxis, xAxis.length - 1);
  // console.log(table);

  // console.groupEnd();

  const highestValue = Math.max(...data.map(item => +item.QC_cell_count));

  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);

  // TODO: What happens to ranges if is less than 0 the highestValue

  return (
    <>
      <select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}>
        {metrics && metrics.length > 0 && metrics.map(metric => (
          <option value={metric} key={`property${metric}`}>{metric}</option>
        ))}
      </select>
      <div>selectedMetric: {selectedMetric}</div>
      <div>Value: QC_cell_count</div>
      <div>Highest: {highestValue}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${xAxis.length}, 1fr)`,
        gridTemplateRows: `repeat(${yAxis.length}, 1fr)`,
      }}>
        {xAxis.map((item, index) => <div key={`xAxis${item + index}`}>{item}</div>)}
        {table.map((item, index) => {
          if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
            return <HeatmapWell key={`data${item.Metadata_Well + index}`} item={item} highestValue={highestValue} />;
          }
          return <div key={`yAxis${item}${index}`}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Heatmap;