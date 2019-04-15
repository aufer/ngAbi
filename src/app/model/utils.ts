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
    elements: normalizeElements(contentGroup.content),
    data: hasData(contentGroup.data) ? normalizeAssetData(contentGroup.data) : undefined
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

const normalizeAssetData = data => {
  const asset = data.target.fields;
  return {
    url: asset.file.url,
    caption: asset.title + ' - ' + asset.description
  };
};

const hasData = data => data && Object.keys(data).length > 0;
