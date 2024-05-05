import Papa from 'papaparse';
import { ChangeEvent, useRef } from 'react';
import useHeatmapStore, { IHeatmapData } from '@/store/store.ts';
import classes from './InputParser.module.css';

function InputParser() {
  const { setHeatmapData, clearFile, rawHeatmap, errors } = useHeatmapStore();
  const input = useRef<null | HTMLInputElement>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: IHeatmapData) {
        setHeatmapData(results);
      },
    });
  };

  const handleClearFile = () => {
    const el = input.current;
    if (el) el.value = '';
    clearFile();
  };

  return (
    <div>
      <input
        ref={input}
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        className={classes.inputFile}
      />
      <button
        className={classes.clearBtn}
        onClick={handleClearFile}
        disabled={!rawHeatmap && errors.length === 0}
      >Clear File</button>
    </div>
  );
}

export default InputParser;
