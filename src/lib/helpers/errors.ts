import type { IValidationError } from '$lib/interfaces';


/**
 * Map errors to error container
 */
export const mapErrors = (
  errContainer: IValidationError,
  errData: IValidationError
): IValidationError => {
  Object.keys(errData).forEach(k => {
    errContainer[k] = errData[k];
  });
  return errContainer;
}

/**
 * Clean errors container
 */
export const cleanErrors = (
  errContainer: IValidationError,
): IValidationError => {
  Object.keys(errContainer).forEach(k => {
    errContainer[k] = [];
  });
  return errContainer;
}
