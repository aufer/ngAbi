import {Entry, EntryCollection} from 'contentful';
import {normalizeRichContent, sortBy} from './utils';
import {Article} from './article.model';
import {normalizePictureElement} from './page.factory';

export const articleCollectionBuilder = (rawPages: EntryCollection<any>) => {
  return rawPages.items
  .map(buildArticle)
  .sort(sortBy('created'));
};

const buildArticle = (rawArticle: Entry<any>): Article => {
  return {
    title: rawArticle.fields['headline'],
    created: new Date(Date.parse(rawArticle.fields['erstellungsdatum'])).toLocaleDateString('de'),
    content: normalizeRichContent(rawArticle.fields['artikelInhalt']),
    image: normalizePictureElement(rawArticle.fields['blogPostImage'])
  };
};
