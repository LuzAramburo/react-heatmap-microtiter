import { GenericKeyPairString } from '@/store/store.ts';

function countDecimalPlaces(number: number) {
  const decimalIndex = number.toString().indexOf('.');
  return decimalIndex >= 0 ? number.toString().length - decimalIndex - 1 : 0;
}

export function splitNumberIntoRanges(
  numRanges: number,
  highNumber: number,
  lowNumber: number = 0,
) {
  // Calculate the base size of each range
  const rangeSize = (highNumber - lowNumber) / numRanges;

  // Initialize an array to hold the ranges
  const ranges: number[][] = [];

  // Start of the first range
  let start = lowNumber;

  // Iterate through each range
  for (let i = 0; i < numRanges; i++) {
    // Calculate the end of the current range
    const end = start + rangeSize;

    // Add the current range as a tuple [start, end]
    let addOffset = 1;
    if (end % 1 != 0) {
      const howManyDecimals = countDecimalPlaces(end);
      addOffset = parseFloat('.'+'1'.padStart(howManyDecimals, '0'));
    }
    ranges.push([start, end - addOffset]); // Subtract 1 from end to avoid overlap

    // Update the start of the next range
    start = end;
  }
  // Adjust the last range to highNumber if it is currently less than highNumber
  if (ranges[ranges.length -1][1] < highNumber) ranges[ranges.length -1][1] = highNumber;

  // Return the array of ranges
  return ranges;
}

function getRangesForNumericMetric(data: GenericKeyPairString[], selectedMetric: string, numberOfRanges: number) {
  const metricArray = data.map(item => +item[selectedMetric]);

  const highestValueInMetric = Math.max(...metricArray as number[]);
  const lowestValueInMetric = Math.min(...metricArray as number[]);
  return splitNumberIntoRanges(
    numberOfRanges,
    highestValueInMetric,
    lowestValueInMetric,
  );
}

export default getRangesForNumericMetric;
