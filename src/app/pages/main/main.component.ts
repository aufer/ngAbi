import {Component, OnInit} from '@angular/core';
import {ContentfulService} from '../../contentful/contentful.service';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../model/page.model';

@Component({
  selector: 'abi-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  sections;
  footerPages;

  sliderData = [
    {
      title: 'Unsere Pferde',
      caption: 'Auf ihnen lernen unsere Kinder das Reiten und alles was dazu gehört.',
      url: 'assets/slider/pferde.jpg'
    },
    {
      title: 'Unsere Grillstelle',
      caption: 'Treffpunkt für Groß und Klein. Kann man auch mieten!',
      url: 'assets/slider/grill.jpg'
    },
    {
      title: 'Unser Bauplatz',
      caption: 'Hier lernen die Kinder den Umgang mit Werkzeug und bauen eigene Hütten.',
      url: 'assets/slider/bauplatz.jpg'
    }
  ];

  constructor(private ctfSvc: ContentfulService, private route: ActivatedRoute) {
    ctfSvc.getMainPages().then((pages: Page[]) => {
      console.log(pages);
      this.sections = pages;
    });

    ctfSvc.getFooterPages().then((pages: Page[]) => {
      console.log(pages);
      this.footerPages = pages;
    });
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
      if (fragment && document.getElementById(fragment) != null) {
        document.getElementById(fragment).scrollIntoView({behavior: 'smooth'});
      }
    });
  }
}
