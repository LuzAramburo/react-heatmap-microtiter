import Papa from 'papaparse';
import { ChangeEvent } from 'react';
import { HeatmapData } from '@/App.tsx';

type Props = {
  handleInputParse: (data: HeatmapData) => void;
}

function InputParser({ handleInputParse }: Props) {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: HeatmapData) {
        console.group('Parser');
        console.log('results', results);
        console.log('results.data', results.data);

        const properties = results.meta.fields;
        console.log('properties', properties);

        const xAxis= results.data.map(item => item.Metadata_Row);
        console.log('xAxis', xAxis);
        const yAxis= results.data.map(item => item.Metadata_Col);
        console.log('yAxis', yAxis);

        console.groupEnd();
        handleInputParse(results);
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
