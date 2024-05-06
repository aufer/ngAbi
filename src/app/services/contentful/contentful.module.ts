import {NgModule}          from '@angular/core';
import {ContentfulService} from './contentful.service';

@NgModule({
    providers: [
        ContentfulService,
    ]
})
export class ContentfulModule {
}
