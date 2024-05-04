function insertItemsEveryNItems<T>(originalArray: T[], itemsToInsert: T[], N: number): T[] {
  if (itemsToInsert.length === 0) return originalArray;

  // Create a copy of the original array to avoid modifying it directly
  const modifiedArray = [...originalArray];

  // The length of the items to insert array
  const numItemsToInsert = itemsToInsert.length;

  // Insert the first item from itemsToInsert at the start of the array
  modifiedArray.unshift(itemsToInsert[0]);

  // Initialize the index for the items to insert array
  let itemIndex = 1; // Start from the second item in itemsToInsert since the first has already been added

  // Iterate through the array and insert items from itemsToInsert every N items
  for (let i = N + 1; i <= modifiedArray.length - 1; i += N + 1) {
    // Insert the current item from itemsToInsert at the specified index
    modifiedArray.splice(i, 0, itemsToInsert[itemIndex]);

    // Increment the item index and loop back if necessary
    itemIndex = (itemIndex + 1) % numItemsToInsert;
  }

  // Return the modified array
  return modifiedArray;
}

export default insertItemsEveryNItems;
