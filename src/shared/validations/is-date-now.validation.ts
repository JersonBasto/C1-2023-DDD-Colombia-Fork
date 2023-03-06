export const IsDateNow = (date: number | Date) => {
  if (date > Date.now()) {
    return false;
  } else {
    return true;
  }
};
