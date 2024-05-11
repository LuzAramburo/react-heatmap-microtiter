import { RawParsedData, ValidateDataError } from '@/store/store.ts';

export function isMissingCol(fields: string[], requiredCols: string[]) {
  // Initialize an array to accumulate the missing strings from ArrayB
  const missingStrings: string[] = [];

  // Iterate through each string in ArrayB
  for (const requiredCol of requiredCols) {
    // Check if the string from ArrayB is not present in ArrayA
    if (!fields.includes(requiredCol)) {
      // If the string is not in ArrayA, add it to the missingStrings array
      missingStrings.push(requiredCol);
    }
  }

  // Return the array of missing strings
  return missingStrings;
}

function validateData(rawData: RawParsedData) {
  const errors: ValidateDataError[] = [];
  const requiredCols = [
    'Metadata_Col',
    'Metadata_Row',
    'Metadata_Well',
    'Metadata_perturbation_id',
    'Metadata_perturbation_type',
    'QC_cell_count',
    'QC_cell_count_cov',
    'QC_cov_failed',
    'QC_position_effect',
  ];
  const missingCols = isMissingCol(rawData.meta.fields!, requiredCols);
  if (missingCols.length > 0) {
    errors.push({
      type: 'Missing required columns',
      message: `Missing the required columns: ${missingCols.join(', ')}`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default validateData;
