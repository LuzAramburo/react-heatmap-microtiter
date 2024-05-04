function canBeNumber(input: string): boolean {
  // Attempt to parse the input as a float
  const parsedValue = parseFloat(input);

  // Check if the parsed value is not NaN and the input is not an empty string
  if (!isNaN(parsedValue) && input.trim().length > 0) {
    return true;
  }

  // If the parsed value is NaN or the input is empty, return false
  return false;
}

export default canBeNumber;
