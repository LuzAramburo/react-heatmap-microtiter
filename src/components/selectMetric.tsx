import useStore from '@/store/store.ts';
import { ChangeEvent } from 'react';

function SelectMetric() {
  const {
    selectedMetric,
    updateSelectedMetric,
    formattedHeatmap,
  } = useStore(state => state);

  const metrics = formattedHeatmap?.metrics;

  const handleSelectedMetric = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    updateSelectedMetric(e.target.value);
  };

  return (
    <select
      value={selectedMetric}
      onChange={(e) => handleSelectedMetric(e)}>
      {metrics && metrics.length > 0 && metrics.map(metric => (
        <option value={metric} key={`property${metric}`}>{metric}</option>
      ))}
    </select>
  );
}

export default SelectMetric;
