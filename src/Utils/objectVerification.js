/* eslint-disable no-use-before-define */
import months from './months.json';

function isValidUserDateObject(object) {
  if (!(object instanceof Object)) {
    return false;
  }
  const { date, userNames, ...users } = object;
  return isDateArray(date) && isNamesArray(userNames) && isUsersObject(users);
}

function isDateArray(input) {
  return input instanceof Object && isMonth(input.month) && isYear(input.year);
}

function isMonth(input) {
  return typeof input === 'string' && months.some((month) => month === input);
}

function isYear(input) {
  return typeof input === 'number' && !Number.isNaN(input) && input > 0;
}

function isNamesArray(input) {
  return (
    Array.isArray(input) &&
    input.length > 0 &&
    input.every((value) => typeof value === 'string')
  );
}

function isUsersObject(input) {
  if (!(input instanceof Object)) {
    return false;
  }

  return Object.keys(input).every(
    (key) =>
      typeof key === 'string' &&
      Array.isArray(input[key]) &&
      input[key].every(
        (value) =>
          typeof value === 'number' &&
          !Number.isNaN(value) &&
          value <= 31 &&
          value > 0
      )
  );
}

const objectVerification = {
  isValidUserDateObject,
};

export default objectVerification;
