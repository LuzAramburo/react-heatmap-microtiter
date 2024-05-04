import Papa from 'papaparse';
import { ChangeEvent } from 'react';
import { IHeatmapData } from '@/App.tsx';
import useHeatmapStore from '@/store/store.ts';

function InputParser() {
  const { updateRawHeatmap } = useHeatmapStore();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: IHeatmapData) {
        updateRawHeatmap(results);
      },
    });
  };

  return (
    <>
      <div>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
          style={{ display: 'block', margin: '10px auto' }}
        />
      </div>
    </>
  );
}

export default InputParser;
