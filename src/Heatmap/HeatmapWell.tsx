import { IDataCSV } from '@/App.tsx';
import { useState } from 'react';
import HeatmapPopover from '@/Heatmap/HeatmapPopover.tsx';

type Props = {
  item: IDataCSV;
}

function HeatmapWell({ item }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return(
    <>
      <div style={{
        border: '1px solid black',
        position: 'relative',
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
