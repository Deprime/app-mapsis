/**
 * Check phone number lenght
 * In different countries - different phone number length
 */
export const checkPhoneNumberLenght = (
  phoneNumber: string|number,
  numberLength: number|undefined
): boolean => {
  if (phoneNumber && numberLength) {
    return `${phoneNumber}`.length === numberLength;
  }
  else
    return false;
};

/**
 * Check verification codelenght
 */
export const checkVerificationCodeLenght = (code: string|number) => {
  if (code) {
    return `${code}`.length === 4
  }
  return false;
};
