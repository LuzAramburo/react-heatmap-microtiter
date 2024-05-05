import Heatmap from '@/components/Heatmap/Heatmap.tsx';
import SelectMetric from '@/components/shared/SelectMetric/SelectMetric.tsx';
import useHeatmapStore from '@/store/store.ts';

function DataVisualizationPage () {
  const { rawHeatmap } = useHeatmapStore();
  return (
    <div>
      <h1>Data Visualization</h1>
      {rawHeatmap && <SelectMetric/>}
      <Heatmap/>
    </div>
  );
}

export default DataVisualizationPage;
