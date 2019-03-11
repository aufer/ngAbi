import {InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken('Window');
export function windowFactory() {
  return window;
}
