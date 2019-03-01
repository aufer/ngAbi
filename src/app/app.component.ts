import {Component} from '@angular/core';
import {ContentfulService} from './contentful/contentful.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Abenteuerspielplatz Möglingen e.V.';
  sections;
  footerPages;

  constructor(private ctfSvc: ContentfulService, private router: Router) {
    ctfSvc.getMainPages().then(pages => {
      this.sections = pages;
    });

    ctfSvc.getFooterPages().then(pages => {
      this.footerPages = pages;
    });
  }
}
