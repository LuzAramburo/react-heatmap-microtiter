import { IDataCSV } from '@/App.tsx';
import { useState } from 'react';
import HeatmapPopover from '@/Heatmap/HeatmapPopover.tsx';
import getColorHeatmap from '../../utils/getColorHeatmap.ts';

type Props = {
  item: IDataCSV;
  highestValue: number;
  selectedMetric: string;
}

function HeatmapWell({ item, highestValue, selectedMetric }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return(
    <>
      <div style={{
        border: '1px solid black',
        position: 'relative',
        background: getColorHeatmap(highestValue, +item[selectedMetric]),
      }}
      onMouseEnter={() => setIsPopoverOpen(true)}
      onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <div>
          {item.Metadata_Well}
        </div>
        {isPopoverOpen && <HeatmapPopover item={item}/>}
      </div>
    </>
  );
}

export default HeatmapWell;
