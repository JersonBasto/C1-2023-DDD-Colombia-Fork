export const IsDescriptionLength = (value: string) => {
  if (value) {
    if (value.length < 60 && value.length > 20) {
      return true;
    }
    return false;
  }
  return false;
};
