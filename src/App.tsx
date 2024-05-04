import './App.css';
import InputParser from './components/InputParser.tsx';
import Heatmap from '@/components/Heatmap/Heatmap.tsx';
import { ParseResult } from 'papaparse';
import useHeatmapStore from '@/store/store.ts';

export type IHeatmapData = ParseResult<{[keys: string]: string}>

function App() {
  const { rawHeatmap } = useHeatmapStore();

  return (
    <>
      <InputParser />
      {!rawHeatmap && <div>Update a file</div>}
      {rawHeatmap && <Heatmap heatmapData={rawHeatmap} />}
    </>
  );
}

export default App;
