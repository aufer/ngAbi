import {InjectionToken} from '@angular/core';
import * as ctf from 'contentful';
import {ContentfulClientApi} from 'contentful';

export const CtfRaw = new InjectionToken('CtfRaw');

const client = ctf.createClient({
  space: '7y15srvei12d',
  accessToken: '5fe282e7d4a6dd67d28139ac7219b5a8acc2e847973b3828824aaff9c73bae57'
});

export const contentfulFactory = (): ContentfulClientApi => {
  return client;
};
