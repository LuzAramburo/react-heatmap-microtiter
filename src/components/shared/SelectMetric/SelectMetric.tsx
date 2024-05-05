import useStore from '@/store/store.ts';
import { ChangeEvent } from 'react';
import classes from './SelectMetric.module.css';

function SelectMetric() {
  const {
    selectedMetric,
    updateSelectedMetric,
    formattedHeatmap,
  } = useStore(state => state);

  const metrics = formattedHeatmap?.metrics;

  const handleSelectedMetric = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedMetric(e.target.value);
  };

  return (
    <>
      <label htmlFor="metricSelect" className={classes.label}>Select Metric</label>
      <div className={classes.selectDropdown}>
        <select
          id="metricSelect"
          value={selectedMetric}
          onChange={(e) => handleSelectedMetric(e)}>
          {metrics && metrics.length > 0 && metrics.map(metric => (
            <option value={metric} key={`property${metric}`}>{metric}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectMetric;
