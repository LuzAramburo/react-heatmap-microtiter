import validateData from '@/utils/validateData.ts';
import canBeNumber from '@/utils/canBeNumber.ts';
import getRangesForNumericMetric from '@/utils/getRangesForNumericMetric.ts';
import getColorHeatmap from '@/utils/getColorHeatmap.ts';
import insertItemsEveryNItems from '@/utils/insertItemsEveryNItems.ts';
import { GenericKeyPairString, heatmapColors, IHeatmapData } from '@/store/store.ts';

function formatHeatmap(newRawHeatmap: IHeatmapData, selectedMetric: string) {
  const validatingData = validateData(newRawHeatmap);
  if (!validatingData.isValid) {
    return { errors: validatingData.errors };
  }

  if (newRawHeatmap.errors.length > 0) {
    return { errors: newRawHeatmap.errors };
  }

  const isMetricNumeric = canBeNumber(newRawHeatmap.data[0][selectedMetric]);
  const metricOptions = [...new Set(newRawHeatmap.data.map(item => item[selectedMetric]))];

  const rangesForNumericMetric= getRangesForNumericMetric(
    newRawHeatmap.data,
    selectedMetric,
    heatmapColors.length,
  );

  const data = newRawHeatmap.data
    .sort((a, b) =>
      a.Metadata_Well.length - b.Metadata_Well.length || a.Metadata_Well.localeCompare(b.Metadata_Well),
    )
    .map(item => {
      let color = null;
      if (isMetricNumeric) {
        color = getColorHeatmap(+item[selectedMetric], rangesForNumericMetric, heatmapColors);
      } else {
        const index = metricOptions.indexOf(item[selectedMetric]);
        color = heatmapColors[index];
      }
      return { ...item, color };
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
    xAxis,
    yAxis,
    table,
  };
}

export default formatHeatmap;
