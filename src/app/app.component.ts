import {Component, OnInit} from '@angular/core';
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
      console.log(fragment);
      if (fragment && document.getElementById(fragment) != null) {
        document.getElementById(fragment).scrollIntoView({behavior: 'smooth'});
      }
    });
  }
}
