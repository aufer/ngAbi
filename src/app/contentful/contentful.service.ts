import {Inject, Injectable} from '@angular/core';
import {ContentfulClientApi, EntryCollection} from 'contentful';
import {CtfRaw} from './contentful.factory';

@Injectable()
export class ContentfulService {

  constructor(@Inject(CtfRaw) private ctfSvc: ContentfulClientApi) {
  }

  getAllPages() {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage'
    }).then((entries: EntryCollection<any>) => {
      return entries.items
      .filter(item => item.sys.contentType.sys.id === 'contentPage')
      .map(page => ({
        title: page.fields['seitentitel'],
        content: normalizePageContent(page.fields['seiteninhalt'].content)
      }));
    });
  }

  getMainPages() {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.hauptseite': true,
      order: 'fields.order'
    }).then((entries: EntryCollection<any>) => {
      return entries.items
      .map(buildPage)
      .sort((a, b) => {
        return a.order < b.order ? -1 : 1;
      });
    });
  }

  getFooterPages() {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.footer': true,
      order: 'fields.order'
    }).then((entries: EntryCollection<any>) => {
      return entries.items
      .map(buildPage)
      .sort((a, b) => {
        return a.order < b.order ? -1 : 1;
      });
    });
  }

  getSliderById(id: string) {
    return this.ctfSvc.getEntry(id).then(entry => {
      return {
        name: entry.fields['name'],
        sliderImages: entry.fields['sliderImages'].map(s => ({...s['fields']}))
      };
    });
  }
}

const buildPage = page => ({
  title: page.fields['seitentitel'],
  anchor: replaceSpecialChars(page.fields['seitentitel'].toLowerCase()),
  content: normalizePageContent(page.fields['seiteninhalt'].content),
  customContent: normalizeCustomContent(page.fields['customElements']),
  order: page.fields['order']
});

const replaceSpecialChars = text => {
  return text
  .replace('ä', 'ae')
  .replace('ö', 'oe')
  .replace('ü', 'ue')
  .replace('ß', 'ss')
  .replace(' ', '')
  .replace('-', '');
};

const normalizePageContent = (content) => {
  return content.map(contentGroup => ({
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

const normalizePictureElement = imageData => {
  return {
    url: imageData.fields.file.url,
    title: imageData.fields.title
  };
};
