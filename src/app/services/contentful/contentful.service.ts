import {ContentfulClientApi} from 'contentful';
import {Inject, Injectable} from '@angular/core';
import {CtfRaw} from './contentful.factory';
import {Page} from '../../model/page.model';
import {pageCollectionBuilder} from '../../model/page.factory';
import {articleCollectionBuilder} from '../../model/article.factory';
import {Article} from '../../model/article.model';
import {Appointment} from '../../model/appointment.model';
import {appointmentsCollectionBuilder} from '../../model/appointment.factory';

@Injectable()
export class ContentfulService {

  constructor(@Inject(CtfRaw) private ctfSvc: ContentfulClientApi) {
  }

  getMainPages(): Promise<Page[]> {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.hauptseite': true,
      order: 'fields.order'
    }).then(pageCollectionBuilder);
  }

  getFooterPages() {
    return this.ctfSvc.getEntries({
      content_type: 'contentPage',
      'fields.footer': true,
      order: 'fields.order'
    }).then(pageCollectionBuilder);
  }

  getArticles(): Promise<Article[]> {
    return this.ctfSvc.getEntries({
      content_type: 'blogPost',
      order: '-fields.erstellungsdatum'
    }).then(articleCollectionBuilder);
  }

  getLatestArticles(): Promise<Article[]> {
    return this.ctfSvc.getEntries({
      content_type: 'blogPost',
      order: '-fields.erstellungsdatum',
      limit: 3
    }).then(articleCollectionBuilder);
  }

  getUpcomingAppointments(): Promise<Appointment[]> {
    return this.ctfSvc.getEntries({
      content_type: 'termine',
      order: '-fields.datum',
      limit: 5,
      'fields.datum[gte]': new Date().toISOString()
    }).then(appointmentsCollectionBuilder);
  }
}
