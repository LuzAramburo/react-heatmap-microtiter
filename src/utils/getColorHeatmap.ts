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

function getColorHeatmap(
  wellValueForMetric: number,
  rangesForMetric: number[][],
  colors: string[],
): string {
  const index = findIndexWhereNumberFits(wellValueForMetric, rangesForMetric);
  return colors[index];
}

export default getColorHeatmap;
