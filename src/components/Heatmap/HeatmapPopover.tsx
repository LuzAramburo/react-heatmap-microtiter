type Props = {
  item: {[keys: string]: string};
}

function HeatmapPopover({ item }: Props) {
  return(
    <div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        background: 'white',
        border: '1px solid black',
        padding: '5px',
        zIndex: '10',
      }}
    >
      {Object.keys(item).map(function(key) {
        return <div key={key}>{key === '' ? '' : key + ': '} {item[key]}</div>;
      })}
    </div>
  );
}
export default HeatmapPopover;
