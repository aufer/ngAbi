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

export const normalizeRichContent = (content) => {
  return content.content.map(contentGroup => ({
    type: contentGroup.nodeType,
    elements: normalizeElements(contentGroup.content)
  }));
};

const normalizeElements = elements => {
  return elements.map(element => {
    return {
      type: element.nodeType,
      value: element.value || undefined,
      content: element.content ? normalizeElements(element.content) : undefined,
      marks: element.marks ? element.marks.map(m => m.type) : [],
      raw: {...element}
    };
  });
};
