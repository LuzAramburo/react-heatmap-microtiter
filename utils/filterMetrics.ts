import canBeNumber from './canBeNumber';

function filterPropertiesByNumber<T>(obj: T) {
  // Create a new object to hold the filtered properties
  const filteredObj: {[keys: string]: number} = {};

  // Iterate through the object's properties
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === '') continue; // Skip this property if the key is an empty array
      // Get the value of the current property
      const value = obj[key];

      // Check if the value can be interpreted as a valid number
      if (canBeNumber(value)) {
        // If the value is a valid number, add the property to the filtered object
        filteredObj[key] = parseFloat(value);
      }
    }
  }

  // Return the filtered object
  return filteredObj;
}

export default filterPropertiesByNumber;
