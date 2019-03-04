export const replaceSpecialChars = text => {
  return text
  .replace('ä', 'ae')
  .replace('ö', 'oe')
  .replace('ü', 'ue')
  .replace('ß', 'ss')
  .replace(' ', '')
  .replace('-', '');
};

export const sortBy = prop => (a, b) => {
  return a[prop] < b[prop] ? -1 : 1;
};
