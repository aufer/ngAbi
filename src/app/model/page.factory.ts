import {EntryCollection} from 'contentful';
import {normalizeRichContent, replaceSpecialChars, sortBy} from './utils';
import {Page} from './page.model';

export const pageCollectionBuilder = (rawPages: EntryCollection<any>) => {
  return rawPages.items
  .map(buildPage)
  .sort(sortBy('order'));
};

export const pageBuilder = rawPage => {
  return buildPage(rawPage);
};

const buildPage = (page): Page => ({
  title: page.fields['seitentitel'],
  anchor: replaceSpecialChars(page.fields['seitentitel'].toLowerCase()),
  content: normalizeRichContent(page.fields['seiteninhalt']),
  customContent: normalizeCustomContent(page.fields['customElements']),
  order: page.fields['order'],
  images: [],
  isMain: false,
  isFooter: false
});

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

export const normalizePictureElement = imageData => {
  if (!imageData) return;
  return {
    url: imageData.fields.file.url,
    title: imageData.fields.title
  };
};

