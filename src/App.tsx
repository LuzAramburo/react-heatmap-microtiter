import './App.css';
import InputParser from './components/InputParser.tsx';
import Heatmap from '@/components/Heatmap/Heatmap.tsx';
import { ParseResult } from 'papaparse';
import useHeatmapStore from '@/store/store.ts';
import SelectMetric from '@/components/selectMetric.tsx';

export type IHeatmapData = ParseResult<{[keys: string]: string}>

function App() {
  const { rawHeatmap } = useHeatmapStore();

  return (
    <>
      <div>
        <h1>Data loading</h1>
        <InputParser />
        <SelectMetric />
      </div>
      <div>
        <h1>Data Visualization</h1>
        {!rawHeatmap && <div>Update a file</div>}
        {rawHeatmap && <Heatmap heatmapData={rawHeatmap} />}
      </div>
    </>
  );
}

export default App;
