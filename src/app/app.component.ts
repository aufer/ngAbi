import {Component, HostListener, OnInit} from '@angular/core';
import {ContentfulService} from './contentful/contentful.service';
import {ActivatedRoute} from '@angular/router';
import {delay, timeout} from 'rxjs/internal/operators';

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

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.showGoUp = window.scrollY > window.innerHeight;
  }

  constructor(private ctfSvc: ContentfulService, private route: ActivatedRoute) {
    ctfSvc.getMainPages().then(pages => {
      this.sections = pages;
    });

    ctfSvc.getFooterPages().then(pages => {
      this.footerPages = pages;
    });
  }

  ngOnInit() {
    this.route.fragment.pipe(delay(50)).subscribe((fragment: string) => {
      if (fragment && document.getElementById(fragment) != null) {
        this.scrollTo(fragment);
      }
    });
  }

  goUp() {
      this.scrollTo('mainNav');
  }

  private scrollTo(elemId) {
    document.getElementById(elemId).scrollIntoView({behavior: 'smooth'});
  }
}
