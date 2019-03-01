import {NgModule} from '@angular/core';
import {ContentfulService} from './contentful.service';
import {contentfulFactory, CtfRaw} from './contentful.factory';

@NgModule({
  providers: [
    ContentfulService,
    {
      provide: CtfRaw,
      useFactory: contentfulFactory
    },
    {
      provide: ContentfulService,
      useClass: ContentfulService,
      deps: [CtfRaw]
    }
  ]
})
export class ContentfulModule {}
