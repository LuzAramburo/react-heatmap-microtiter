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
    const data = newRawHeatmap.data;
    // console.log('results.data', data);

    // const metrics = Object.keys(filterPropertiesByNumber(heatmapData.data[0]));
    // console.log('properties', properties);

    const xAxis= ['', ...new Set(newRawHeatmap.data.map(item => item.Metadata_Row))];
    // console.log('xAxis', xAxis);
    const yAxis= [...new Set(newRawHeatmap.data.map(item => item.Metadata_Col))];
    // console.log('yAxis', yAxis);

    const table = insertItemsEveryNItems<string | GenericKeyPairString>(
      data,
      yAxis,
      xAxis.length - 1,
    );
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
