import './App.css';
import InputParser from './components/InputParser.tsx';
import Heatmap from '@/Heatmap/Heatmap.tsx';
import { useState } from 'react';
import { ParseResult } from 'papaparse';

export type IHeatmapData = ParseResult<{[keys: string]: string}>

function App() {
  const [heatmapData, setHeatmapData] = useState<IHeatmapData | null>(null);


  return (
    <>
      <InputParser handleInputParse={setHeatmapData} />
      {!heatmapData && <div>Update a file</div>}
      {heatmapData && <Heatmap heatmapData={heatmapData} />}
    </>
  );
}

export default App;
