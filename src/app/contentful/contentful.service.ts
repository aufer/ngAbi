import {ContentfulClientApi, EntryCollection} from 'contentful';
import {Inject, Injectable} from '@angular/core';
import {CtfRaw} from './contentful.factory';
import {Page} from '../model/page.model';
import {pageFactory} from '../model/page.factory';

@Injectable()
export class ContentfulService {

  constructor(@Inject(CtfRaw) private ctfSvc: ContentfulClientApi) {
  }

  getMainPages(): Promise<Page[]> {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.hauptseite': true,
      order: 'fields.order'
    }).then(pageFactory);
  }

  getFooterPages() {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.footer': true,
      order: 'fields.order'
    }).then(pageFactory);
  }
}
