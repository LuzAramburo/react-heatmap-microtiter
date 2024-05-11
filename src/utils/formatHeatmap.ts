import validateData from '@/utils/validateData.ts';
import canBeNumber from '@/utils/canBeNumber.ts';
import getRangesForNumericMetric from '@/utils/getRangesForNumericMetric.ts';
import getColorHeatmap from '@/utils/getColorHeatmap.ts';
import insertItemsEveryNItems from '@/utils/insertItemsEveryNItems.ts';
import { GenericKeyPairString, heatmapColors, IFormatedHeatmap, RawParsedData } from '@/store/store.ts';

function formatHeatmap(newRawHeatmap: RawParsedData, selectedMetric: string): IFormatedHeatmap {
  if (!selectedMetric) throw new Error('Missing selected Metric');

  if (newRawHeatmap.errors.length > 0) {
    return {
      errors: newRawHeatmap.errors,
      xAxis: [],
      yAxis: [],
      table: [],
      metricInfo: null,
    };
  }

  const validatingData = validateData(newRawHeatmap);
  if (!validatingData.isValid) {
    return {
      metricInfo: null,
      errors: validatingData.errors,
      xAxis: [],
      yAxis: [],
      table: [],
    };
  }

  const isMetricNumeric = canBeNumber(newRawHeatmap.data[0][selectedMetric]);
  // const metricOptions = [...new Set(newRawHeatmap.data.map(item => item[selectedMetric]))]; // TODO reduce
  const metricOptions = newRawHeatmap.data.reduce((acc, currentItem) => {
    if (acc === '') return currentItem[selectedMetric];
    if (!acc.includes(currentItem[selectedMetric])) return acc.concat(',', currentItem[selectedMetric]) ;
    return acc;
  }, '')
    .split(',');

  const rangesForNumericMetric= getRangesForNumericMetric(
    newRawHeatmap.data,
    selectedMetric,
    heatmapColors.length,
  );

  const metricInfo = {
    isNumeric: isMetricNumeric,
    highestValue: 0,
    lowestValue: isMetricNumeric ? +newRawHeatmap.data[0][selectedMetric]: 0,
    metricOptions,
  };

  const data = newRawHeatmap.data
    .sort((a, b) =>
      a.Metadata_Well.length - b.Metadata_Well.length || a.Metadata_Well.localeCompare(b.Metadata_Well),
    )
    .map(item => {
      if (isMetricNumeric) {
        const itemMetricValue = +item[selectedMetric];
        const color = getColorHeatmap(itemMetricValue, rangesForNumericMetric, heatmapColors);
        if (itemMetricValue > metricInfo.highestValue) metricInfo.highestValue = itemMetricValue;
        if (itemMetricValue < metricInfo.lowestValue) metricInfo.lowestValue = itemMetricValue;
        return { ...item, color };
      } else {
        const index = metricOptions.indexOf(item[selectedMetric]);
        const color = heatmapColors[index];
        return { ...item, color };
      }
    });

  const xAxis= [...new Set(newRawHeatmap.data.map(item => item.Metadata_Row))];
  const yAxis= [...new Set(newRawHeatmap.data.map(item => item.Metadata_Col))];

  const table = [
    '',
    ...yAxis,
    ...insertItemsEveryNItems<string | GenericKeyPairString>(
      data,
      xAxis,
      yAxis.length,
    ),
  ];

  return {
    metricInfo,
    xAxis,
    yAxis,
    table,
  };
}

export default formatHeatmap;
