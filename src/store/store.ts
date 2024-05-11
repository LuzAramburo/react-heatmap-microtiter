import { create } from 'zustand';
import { ParseResult } from 'papaparse';
import { devtools } from 'zustand/middleware';
import formatHeatmap from '@/utils/formatHeatmap.ts';

export type GenericKeyPairString = {[keys: string]: string}
export type RawParsedData = ParseResult<GenericKeyPairString>
export type IFormatedHeatmap = {
  errors?: ValidateDataError[];
  xAxis: string[];
  yAxis: string[];
  table: (string | GenericKeyPairString)[];
}
export type ValidateDataError = {type: string; message: string}

type State = {
  metrics: string[];
  rawHeatmap: RawParsedData | null;
  formattedHeatmap: IFormatedHeatmap | null;
  selectedMetric: string;
  errors: ValidateDataError[];
}

type Actions = {
  clearFile: () => void;
  setHeatmapData: (newRawHeatmap: RawParsedData) => void;
  updateSelectedMetric: (newMetric: string) => void;
}

export const heatmapColors = ['#1d4877', '#1b8a5a', '#fbb021', '#f68838', '#ee3e32'];

const useHeatmapStore = create<State & Actions>()(devtools((set) => ({
  rawHeatmap: null,
  formattedHeatmap: null,
  selectedMetric: '',
  errors: [],
  metrics: [],
  clearFile: () => set({ rawHeatmap: null, formattedHeatmap: null, errors: [] }),
  setHeatmapData: (newRawHeatmap: RawParsedData) => set(() => {
    const metrics = newRawHeatmap?.meta.fields?.filter(
      item => item !== '' && !item.includes('Metadata'),
    );
    if (!metrics) throw new Error('No valid metrics available');
    const selectedMetric = metrics[0];

    const formattedHeatmap = formatHeatmap(newRawHeatmap, selectedMetric);

    return {
      rawHeatmap: newRawHeatmap,
      metrics,
      selectedMetric,
      formattedHeatmap,
      errors: [],
    };
  },
  ),
  updateSelectedMetric: (newMetric: string) => set(({ rawHeatmap }) => {
    if (!rawHeatmap) throw new Error('No data available');
    const formattedHeatmap = formatHeatmap(rawHeatmap, newMetric);
    return { selectedMetric: newMetric, formattedHeatmap };
  }),
})));

export default useHeatmapStore;
