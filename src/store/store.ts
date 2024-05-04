import { create } from 'zustand';
import { ParseResult } from 'papaparse';
import { devtools } from 'zustand/middleware';
import insertItemsEveryNItems from '@/utils/insertItemsEveryNItems.ts';

export type GenericKeyPairString = {[keys: string]: string}
export type IHeatmapData = ParseResult<GenericKeyPairString>
export type IFormatedHeatmap = {
  metrics: string[];
  data: GenericKeyPairString[];
  xAxis: string[];
  yAxis: string[];
  table: (string | GenericKeyPairString)[];
}

type HeatmapStore = {
  rawHeatmap: IHeatmapData | null;
  formattedHeatmap: IFormatedHeatmap | null;
  selectedMetric: string;
  setHeatmapData: (newRawHeatmap: IHeatmapData) => void;
  updateSelectedMetric: (newMetric: string) => void;
}

// TODO string metrics

const useHeatmapStore = create<HeatmapStore>()(devtools((set) => ({
  rawHeatmap: null,
  formattedHeatmap: null,
  selectedMetric: '',
  setHeatmapData: (newRawHeatmap: IHeatmapData) => set(() => {
    const metrics = newRawHeatmap?.meta.fields?.filter(
      item => item !== '' && !item.includes('Metadata'),
    );
    if (!metrics) throw new Error('No valid metrics available');


    // console.group('Parser');
    // console.log('results', heatmapData);
    const data = newRawHeatmap.data
      .sort((a, b) =>
        a.Metadata_Well.length - b.Metadata_Well.length || a.Metadata_Well.localeCompare(b.Metadata_Well),
      );
    // console.log('results.data', data);

    const xAxis= [...new Set(newRawHeatmap.data.map(item => item.Metadata_Row))];
    // console.log('xAxis', xAxis);
    const yAxis= [...new Set(newRawHeatmap.data.map(item => item.Metadata_Col))];
    // console.log('yAxis', yAxis);

    const table = [
      '',
      ...yAxis,
      ...insertItemsEveryNItems<string | GenericKeyPairString>(
        data,
        xAxis,
        yAxis.length,
      ),
    ];
    // console.log(table);
    // console.groupEnd();

    const formattedHeatmap = {
      metrics,
      data,
      xAxis,
      yAxis,
      table,
    };

    return {
      rawHeatmap: newRawHeatmap,
      selectedMetric: metrics[0],
      formattedHeatmap,
    };
  },
  ),
  updateSelectedMetric: (newMetric: string) => set({ selectedMetric: newMetric }),
})));

export default useHeatmapStore;
