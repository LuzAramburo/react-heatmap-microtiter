import getColorHeatmap from '@/utils/getColorHeatmap.ts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shared/Tooltip.tsx';
import HeatmapTooltipContent from '@/components/Heatmap/HeatmapTooltipContent.tsx';
import { useState } from 'react';

type Props = {
  item: {[keys: string]: string};
  highestValue: number;
  lowestValue: number;
  selectedMetric: string;
}

function HeatmapWell({ item, highestValue, lowestValue, selectedMetric }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const color = getColorHeatmap(highestValue, +item[selectedMetric], lowestValue);

  return(
    <>
      <Tooltip>
        <TooltipTrigger>
          <div style={{
            border: '1px solid black',
            position: 'relative',
            background: color,
            transform: isHovered ? 'scale(1.2)' : '',
            zIndex: isHovered ? '2': '1',
            boxShadow: isHovered ? `0px 0px 5px ${color}` : 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              {item.Metadata_Well}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">
          <HeatmapTooltipContent item={item} />
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default HeatmapWell;
