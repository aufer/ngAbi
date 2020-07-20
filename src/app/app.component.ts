import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {ContentfulService}            from './services/contentful/contentful.service';
import {NavigationEnd, Router}        from '@angular/router';
import {TrackingService}              from './services/tracking.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'Abenteuerspielplatz Möglingen e.V.';
    sections;
    footerPages;

    menuOpen: boolean;
    isScrolledDown: boolean;

    constructor(private ctfSvc: ContentfulService, private router: Router, private trackingSvc: TrackingService, private renderer: Renderer2) {
        ctfSvc.getMainPages().then(pages => {
            this.sections = pages;
        });

        ctfSvc.getFooterPages().then(pages => {
            this.footerPages = pages;
        });
    }

    @HostListener('window:scroll') // for window scroll events
    onScroll() {
        this.isScrolledDown = window.scrollY > 100;
    }

    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.trackingSvc.trackPageView();
            }
        });
    }

    cookiesAccepted(selection: boolean) {
        if (selection) {
            this.trackingSvc.initialize(this.renderer);
        } else {
            this.trackingSvc.deactivate();
        }
    }
}
