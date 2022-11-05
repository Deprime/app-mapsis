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
export const checkVerificationCodeLenght = (code: string|number): boolean => {
  if (code) {
    return `${code}`.length === 4
  }
  return false;
};

/**
 * Generate phone placeholde
 */
export const generatePhonePlaceholde = (lenght: string|number): string => {
  let placeholder = '';
  const spaces = [];

  switch (lenght) {
    case 11:
      spaces.push(3, 7);
      break;
    case 10:
      spaces.push(3, 6);
      break;
    case 9:
      spaces.push(3, 7);
      break;
    case 8:
      spaces.push(3);
      break;
    default:
      spaces.push(3);
      break;
  }

  for (let i = 0; i < lenght; i++) {
    placeholder  = spaces.includes(i)
      ? `${placeholder} X`
      : `${placeholder}X`;
  }
  return placeholder;
};
