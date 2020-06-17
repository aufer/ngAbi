import {ContentfulClientApi}                         from 'contentful';
import {Injectable}                                  from '@angular/core';
import {Page}                                        from '../../model/page.model';
import {pageCollectionBuilder}                       from '../../model/page.factory';
import {articleCollectionBuilder}                    from '../../model/article.factory';
import {Article}                                     from '../../model/article.model';
import {Appointment}                                 from '../../model/appointment.model';
import {appointmentsCollectionBuilder}               from '../../model/appointment.factory';
import * as ctf                                      from "contentful";
import {createClient as createMgmtClient, ClientAPI} from "contentful-management";
import {environment}                                 from "../../../environments/environment";

@Injectable()
export class ContentfulService {
    private ctfSvc: ContentfulClientApi;
    private ctfMgmtSvc: ClientAPI;

    private readonly space = environment.ctfSpaceId;
    private readonly accessToken = environment.ctfApiToken;
    private readonly mgmtAccessToken = environment.ctfMgmtApiToken;

    constructor() {

        this.ctfSvc = ctf.createClient({
            space: this.space,
            accessToken: this.accessToken,
        });

        this.ctfMgmtSvc = createMgmtClient({
            accessToken: this.mgmtAccessToken,
        });
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
            order: 'fields.datum',
            limit: 5,
            'fields.datum[gte]': new Date().toISOString()
        }).then(appointmentsCollectionBuilder);
    }

    getFormFromType(type: string) {
        return this.ctfMgmtSvc.getSpace(this.space).then(space => space.getContentType(type));
    }

    createFormEntry(type, form) {
        this.ctfMgmtSvc.getSpace(this.space).then((space) => space.createEntry(type, {fields: this.transformFields(form)})).then(entry => console.log(entry))
            .catch(console.error)
    }

    private transformFields(form: any) {
        return Object.keys(form).reduce((newForm, field) => {
            return {...newForm, [field]: {'en-US': form[field]}};
        }, {})
    }
}
