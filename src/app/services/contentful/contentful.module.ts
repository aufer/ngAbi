import {NgModule}          from '@angular/core';
import {ContentfulService} from './contentful.service';
import * as ctf            from "contentful";
import * as ctfm           from "contentful-management";

@NgModule({
    providers: [
        ContentfulService,
    ]
})
export class ContentfulModule {
}
