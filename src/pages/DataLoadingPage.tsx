import InputParser from '@/components/shared/InputParser.tsx';
import SelectMetric from '@/components/shared/selectMetric.tsx';
import useHeatmapStore from '@/store/store.ts';
import { Link } from 'react-router-dom';

function DataLoadingPage () {
  const { rawHeatmap, errors } = useHeatmapStore();

  return (
    <div>
      <h1>Data loading</h1>
      <InputParser/>
      {errors.length > 0 && <h2 style={{ color: 'red' }}>Invalid Data</h2>}
      {errors.map((error, index) => (
        <div key={`invalidDataError${index}`}>
          <strong>{error.type}</strong>
          <p>{error.message}</p>
        </div>
      ))}
      {rawHeatmap && rawHeatmap.errors.length === 0 && (
        <>
          <label>Select Metric</label>
          <SelectMetric/>
          <br/>
          <Link to="/visualization">Go to Data Visualization</Link>
        </>
      )}
      <div>
        <h2>Information</h2>
        <h3>Requirements Columns</h3>
        <ul>
          <li>Metadata_Col</li>
          <li>Metadata_Row</li>
          <li>Metadata_Well</li>
          <li>Metadata_perturbation_id</li>
          <li>Metadata_perturbation_type</li>
          <li>QC_cell_count</li>
          <li>QC_cell_count_cov</li>
          <li>QC_cov_failed</li>
          <li>QC_position_effect</li>
        </ul>
      </div>
    </div>
  );
}

export default DataLoadingPage;
