import {InjectionToken} from '@angular/core';
import * as ctf from 'contentful';
import {ContentfulClientApi} from 'contentful';

export const CtfRaw = new InjectionToken('CtfRaw');

const client = ctf.createClient({
  space: 'abc',
  accessToken: 'def'
});

export const contentfulFactory = (): ContentfulClientApi => {
  return client;
};
