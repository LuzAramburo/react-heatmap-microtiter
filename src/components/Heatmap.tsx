import { IDataCSV, IHeatmapData } from '@/App.tsx';
import insertItemsEveryNItems from '../../utils/insertItemsEveryNItems.ts';

type Props = {
  heatmapData: IHeatmapData;
}

function Heatmap({ heatmapData }: Props) {
  console.group('Parser');

  console.log('results', heatmapData);
  const data = heatmapData.data;
  console.log('results.data', data);

  const properties = heatmapData.meta.fields;
  console.log('properties', properties);

  const xAxis= ['', ...new Set(heatmapData.data.map(item => item.Metadata_Row))];
  console.log('xAxis', xAxis);
  const yAxis= [...new Set(heatmapData.data.map(item => item.Metadata_Col))];
  console.log('yAxis', yAxis);

  const table = insertItemsEveryNItems<string | IDataCSV>(data, yAxis, xAxis.length - 1);
  console.log(table);

  console.groupEnd();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${xAxis.length}, 1fr)`,
      gridTemplateRows: `repeat(${yAxis.length}, 1fr)`,
    }}>
      {xAxis.map((item, index) => <div key={`xAxis${item + index}`}>{item}</div>)}
      {table.map((item, index) => {
        if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
          return <div key={`data${item.Metadata_Well + index}`}>{item.Metadata_Well}</div>;
        }
        return <div key={`yAxis${item}${index}`}>{item}</div>;
      })}
    </div>
  );
}

export default Heatmap;
