type Props = {
  item: {[keys: string]: string};
}

function HeatmapTooltipContent({ item }: Props) {
  return(
    <div>
      {Object.keys(item).map(function(key) {
        return <div key={key}>{key === '' ? '' : key + ': '} {item[key]}</div>;
      })}
    </div>
  );
}
export default HeatmapTooltipContent;
