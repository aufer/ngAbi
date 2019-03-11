import {Inject, Injectable, Renderer2} from '@angular/core';
import {environment} from '../../environments/environment';
import {WINDOW} from './window.provider';

export type EventType = 'click';

@Injectable()
export class TrackingService {

  private active: boolean;
  private gtag;
  private defaultOptions = {anonymize_ip: true};
  private trackingId;
  private stage: string;

  constructor(@Inject(WINDOW) private window: Window) {
    this.trackingId = environment.trackingId;
    this.stage = environment.production ? 'prod' : 'dev';
  }

  initialize(renderer: Renderer2) {
    const gtagScript = renderer.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.trackingId;

    const gtagInitScript = renderer.createElement('script');
    gtagInitScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.trackingId}', { 'anonymize_ip': true, content_group1: '${this.stage}' });
    `;

    this.window.document.body.appendChild(gtagScript);
    this.window.document.body.appendChild(gtagInitScript);
    this.gtag = window['gtag'];
    this.active = true;
    this.window['ga-disable-' + this.trackingId] = false;
  }

  deactivate() {
    this.window['ga-disable-' + this.trackingId] = true;
  }

  trackPageView() {
    if (!this.active) return;

    const location = this.window.location;
    this.gtag('config', this.trackingId, {
      ...this.defaultOptions,
      content_group1: this.stage,
      page_location: location.href,
      page_path: location.pathname + location.hash
    });
  }

  trackEvent(type: EventType, options: any) {
    if (!this.active) return;

    this.gtag('event', type, {content_group1: this.stage, ...options});
  }
}
