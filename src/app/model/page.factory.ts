import {EntryCollection} from 'contentful';
import {replaceSpecialChars, sortBy} from './utils';
import {Page} from './page.model';

export const pageFactory = (rawPages: EntryCollection<any>) => {
  return rawPages.items
  .map(buildPage)
  .sort(sortBy('order'));
};

const buildPage = (page): Page => ({
  title: page.fields['seitentitel'],
  anchor: replaceSpecialChars(page.fields['seitentitel'].toLowerCase()),
  content: normalizePageContent(page.fields['seiteninhalt'].content),
  customContent: normalizeCustomContent(page.fields['customElements']),
  order: page.fields['order']
});

const normalizePageContent = (content) => {
  return content.map(contentGroup => ({
    type: contentGroup.nodeType,
    elements: normalizeElements(contentGroup.content)
  }));
};

const normalizeCustomContent = customElements => {
  if (!customElements) return [];

  return customElements.map(ce => {
    if (ce.sys.contentType.sys.id === 'mitarbeiter') {
      return {
        name: ce.fields['name'],
        funktion: ce.fields['funktion'],
        facts: ce.fields['lebenslauf'],
        image: normalizePictureElement(ce.fields['bild'])
      };
    }
  });
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

const normalizePictureElement = imageData => {
  if (!imageData) return;
  return {
    url: imageData.fields.file.url,
    title: imageData.fields.title
  };
};

