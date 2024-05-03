import './App.css';
import InputParser from './components/InputParser.tsx';
import { useState } from 'react';
import { ParseResult } from 'papaparse';

export type HeatmapData = ParseResult<{[keys: string]: string}>

function App() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData>();


  return (
    <>
      <InputParser handleInputParse={setHeatmapData} />

    </>
  );
}

export default App;
