import { operations } from './operations';

const getPlacesAfterSeparator = (string) => {
  const index = string.indexOf('.');
  return string.substring(index + 1).length;
};

const getTotalForDecimals = (string1, string2, operation) => {
  const placesAfterSeparator = Math.max(getPlacesAfterSeparator(string1), getPlacesAfterSeparator(string2));
  const multiplier = Math.pow(10, placesAfterSeparator);
  const multiplied1 = multiply(string1, multiplier);
  const multiplied2 = multiply(string2, multiplier);
  return getTotal(multiplied1, multiplied2, operation) / multiplier;
};

const multiply = (string, multiplier) => (parseFloat(string) * multiplier);

const valueIsDecimal = (value) => {
  const string = value.toString();
  const { length } = string;
  const index = string.indexOf('.');
  return index > -1 && index !== length - 1;
};

export const getTotal = (string1, string2, operation) => {
  if (valueIsDecimal(string1) || valueIsDecimal(string2)) {
    return getTotalForDecimals(string1, string2, operation);
  }

  return [parseFloat(string1), parseFloat(string2)]
    .reduce((a, b) => operations[operation](a, b));
};
