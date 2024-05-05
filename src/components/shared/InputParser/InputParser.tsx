import Papa from 'papaparse';
import { ChangeEvent } from 'react';
import useHeatmapStore, { IHeatmapData } from '@/store/store.ts';
import classes from './InputParser.module.css';

function InputParser() {
  const { setHeatmapData } = useHeatmapStore();

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

  return (
    <div>
      {/*<span>Upload File</span>*/}
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        className={classes.inputFile}
        // style={{ display: 'block', margin: '10px auto' }}
      />
    </div>
  );
}

export default InputParser;
