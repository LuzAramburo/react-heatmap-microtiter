import './App.css';
import InputParser from './components/InputParser.tsx';
import Heatmap from '@/Heatmap/Heatmap.tsx';
import { useState } from 'react';
import { ParseResult } from 'papaparse';

export interface IDataCSV {
  '': string;
  Metadata_Col: string;
  Metadata_Row: string;
  Metadata_Well: string;
  Metadata_perturbation_id: string;
  Metadata_perturbation_type: string;
  QC_cell_count: string;
  QC_cell_count_cov: string;
  QC_cov_failed: string;
  QC_position_effect: string;
}

export type IHeatmapData = ParseResult<IDataCSV>

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
