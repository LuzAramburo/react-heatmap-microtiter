import Heatmap from '@/components/Heatmap/Heatmap.tsx';
import SelectMetric from '@/components/shared/SelectMetric.tsx';

function DataVisualizationPage () {
  return (
    <div>
      <h1>Data Visualization</h1>
      <SelectMetric />
      <Heatmap/>
    </div>
  );
}

export default DataVisualizationPage;
