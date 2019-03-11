import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {ContentfulService} from './services/contentful/contentful.service';
import {NavigationEnd, Router} from '@angular/router';
import {TrackingService} from './services/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Abenteuerspielplatz Möglingen e.V.';
  sections;
  footerPages;

  menuOpen: boolean;
  showGoUp: boolean;

  constructor(private ctfSvc: ContentfulService, private router: Router, private trackingSvc: TrackingService, private renderer: Renderer2) {
    ctfSvc.getMainPages().then(pages => {
      this.sections = pages;
    });

    ctfSvc.getFooterPages().then(pages => {
      this.footerPages = pages;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.showGoUp = window.scrollY > window.innerHeight;
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.trackingSvc.trackPageView();
      }
    });
  }

  goUp() {
    this.trackingSvc.trackEvent('click', {
      'event_category': 'navigation-helper',
      'event_label': 'go-up'
    });
    this.scrollTo('mainNav');
  }

  cookiesAccepted(selection: boolean) {
    if (selection) {
      this.trackingSvc.initialize(this.renderer);
    } else {
      this.trackingSvc.deactivate();
    }
  }

  private scrollTo(elemId) {
    document.getElementById(elemId).scrollIntoView({behavior: 'smooth'});
  }
}
