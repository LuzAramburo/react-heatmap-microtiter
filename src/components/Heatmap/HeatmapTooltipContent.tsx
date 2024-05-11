type Props = {
  item: {[keys: string]: string};
}

function HeatmapTooltipContent({ item }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...properties } = item;
  return(
    <div>
      {Object.keys(properties).map(function(key) {
        return <div key={key}>{key === '' ? '' : key + ': '} {item[key]}</div>;
      })}
    </div>
  );
}
export default HeatmapTooltipContent;
