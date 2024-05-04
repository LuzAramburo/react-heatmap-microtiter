import InputParser from '@/components/shared/InputParser.tsx';
import SelectMetric from '@/components/shared/selectMetric.tsx';
import useHeatmapStore from '@/store/store.ts';
import { Link } from 'react-router-dom';

function DataLoadingPage () {
  const { rawHeatmap } = useHeatmapStore();
  return (
    <div>
      <h1>Data loading</h1>
      <InputParser/>
      {rawHeatmap && (
        <>
          <label>Select Metric</label>
          <SelectMetric/>
          <br/>
          <Link to="/visualization">Go to Data Visualization</Link>
        </>
      )}
    </div>
  );
}

export default DataLoadingPage;
