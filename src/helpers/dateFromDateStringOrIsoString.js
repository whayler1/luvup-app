const ALL_NUMERIC_REGEX = /^\d*$/;

const dateFromDateStringOrIsoString = (date) => {
  if (ALL_NUMERIC_REGEX.test(date)) {
    return new Date(+date);
  }
  return new Date(date);
};

export default dateFromDateStringOrIsoString;
