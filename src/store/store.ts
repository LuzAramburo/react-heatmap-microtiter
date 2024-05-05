import { create } from 'zustand';
import { ParseResult } from 'papaparse';
import { devtools } from 'zustand/middleware';
import insertItemsEveryNItems from '@/utils/insertItemsEveryNItems.ts';
import validateData from '@/utils/validateData.ts';

export type GenericKeyPairString = {[keys: string]: string}
export type IHeatmapData = ParseResult<GenericKeyPairString>
export type IFormatedHeatmap = {
  metrics: string[];
  data: GenericKeyPairString[];
  xAxis: string[];
  yAxis: string[];
  table: (string | GenericKeyPairString)[];
}
export type ValidateDataError = {type: string; message: string}

type HeatmapStore = {
  rawHeatmap: IHeatmapData | null;
  formattedHeatmap: IFormatedHeatmap | null;
  selectedMetric: string;
  errors: ValidateDataError[];
  clearFile: () => void;
  setHeatmapData: (newRawHeatmap: IHeatmapData) => void;
  updateSelectedMetric: (newMetric: string) => void;
}

const useHeatmapStore = create<HeatmapStore>()(devtools((set) => ({
  rawHeatmap: null,
  formattedHeatmap: null,
  selectedMetric: '',
  errors: [],
  clearFile: () => set({ rawHeatmap: null, formattedHeatmap: null }),
  setHeatmapData: (newRawHeatmap: IHeatmapData) => set(() => {
    const validatingData = validateData(newRawHeatmap);
    if (!validatingData.isValid) {
      return { errors: validatingData.errors };
    }

    if (newRawHeatmap.errors.length > 0) {
      return { errors: newRawHeatmap.errors };
    }

    const metrics = newRawHeatmap?.meta.fields?.filter(
      item => item !== '' && !item.includes('Metadata'),
    );
    if (!metrics) throw new Error('No valid metrics available');

    const data = newRawHeatmap.data
      .sort((a, b) =>
        a.Metadata_Well.length - b.Metadata_Well.length || a.Metadata_Well.localeCompare(b.Metadata_Well),
      );

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
      errors: [],
    };
  },
  ),
  updateSelectedMetric: (newMetric: string) => set({ selectedMetric: newMetric }),
})));

export default useHeatmapStore;
