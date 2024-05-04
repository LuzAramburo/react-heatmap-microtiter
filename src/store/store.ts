import { create } from 'zustand';
import { ParseResult } from 'papaparse';
import { devtools } from 'zustand/middleware';

export type GenericKeyPairString = {[keys: string]: string}
export type IHeatmapData = ParseResult<GenericKeyPairString>
export type IFormatedHeatmap = {
  metrics: string[];
}

type HeatmapStore = {
  rawHeatmap: IHeatmapData | null;
  formattedHeatmap: IFormatedHeatmap | null;
  selectedMetric: string;
  updateRawHeatmap: (newRawHeatmap: IHeatmapData) => void;
  updateSelectedMetric: (newMetric: string) => void;
}

// TODO string metrics

const useHeatmapStore = create<HeatmapStore>()(devtools((set) => ({
  rawHeatmap: null,
  formattedHeatmap: null,
  selectedMetric: '',
  updateRawHeatmap: (newRawHeatmap: IHeatmapData) => set(() => {
    const metrics = newRawHeatmap?.meta.fields?.filter(
      item => item !== '' && !item.includes('Metadata'),
    );

    if (!metrics) throw new Error('No valid metrics available');

    return {
      rawHeatmap: newRawHeatmap,
      selectedMetric: metrics[0],
      formattedHeatmap: { metrics: metrics },
    };
  },
  ),
  updateSelectedMetric: (newMetric: string) => set({ selectedMetric: newMetric }),
})));

export default useHeatmapStore;
