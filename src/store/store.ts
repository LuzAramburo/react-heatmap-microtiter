import { create } from 'zustand';
import { ParseResult } from 'papaparse';

export type GenericKeyPairString = {[keys: string]: string}
export type IHeatmapData = ParseResult<GenericKeyPairString>

type HeatmapStore = {
  rawHeatmap: IHeatmapData | null;
  updateRawHeatmap: (newRawHeatmap: IHeatmapData) => void;
}

const useHeatmapStore = create<HeatmapStore>((set) => ({
  rawHeatmap: null,
  updateRawHeatmap: (newRawHeatmap: IHeatmapData) => set({ rawHeatmap: newRawHeatmap }),
}));

export default useHeatmapStore;
