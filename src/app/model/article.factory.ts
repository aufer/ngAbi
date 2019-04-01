import {Entry, EntryCollection} from 'contentful';
import {normalizeRichContent} from './utils';
import {Article} from './article.model';
import {normalizePictureElement} from './page.factory';

export const articleCollectionBuilder = (rawPages: EntryCollection<any>) => {
  return rawPages.items.map(buildArticle);
};

const buildArticle = (rawArticle: Entry<any>): Article => {
  return {
    title: rawArticle.fields['headline'],
    created: new Date(Date.parse(rawArticle.fields['erstellungsdatum'])).toLocaleDateString('de'),
    anchor: createAnchor(rawArticle),
    content: normalizeRichContent(rawArticle.fields['artikelInhalt']),
    image: normalizePictureElement(rawArticle.fields['blogPostImage'])
  };
};

const createAnchor = (rawArticle: Entry<any>): string => {
  return rawArticle.fields['headline'].toLowerCase().replace(/[!\-,\s]/g, '');
};
