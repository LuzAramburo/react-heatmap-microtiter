function countDecimalPlaces(number: number) {
  const decimalIndex = number.toString().indexOf('.');
  return decimalIndex >= 0 ? number.toString().length - decimalIndex - 1 : 0;
}

export function splitNumberIntoRanges(highNumber: number, numRanges: number, lowNumber: number = 0) {
  // Calculate the base size of each range using integer division
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

export function findIndexWhereNumberFits(numberValue: number, arrayOfArrays: number[][]) {
  // Iterate through the array of arrays
  for (let index = 0; index < arrayOfArrays.length; index++) {
    // Get the current inner array (range)
    const range = arrayOfArrays[index];

    // Ensure the range has exactly two numbers (start and end)
    if (range.length !== 2) {
      throw new Error(`Each array must contain 2 elements for the start and end of a range. Error at index ${index}`);
    }

    // Destructure the range into start and end
    const [start, end] = range;

    // Check if numberValue fits within the range (inclusive)
    if (numberValue >= start && numberValue <= end) {
      // If numberValue fits within the range, return the index
      return index;
    }
  }

  // If numberValue does not fit in any range, return -1
  return -1;
}
[];
function getColorHeatmap(
  highestValue: number,
  highValue: number,
  lowValue: number = 0,
  colors: string[] = ['#1d4877', '#1b8a5a', '#fbb021', '#f68838', '#ee3e32'],
): string {
  const ranges = splitNumberIntoRanges(highestValue, colors.length, lowValue);
  const index = findIndexWhereNumberFits(highValue, ranges);
  return colors[index];
}

export default getColorHeatmap;
