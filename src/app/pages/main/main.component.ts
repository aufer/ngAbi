import {Component} from '@angular/core';
import {ContentfulService} from '../../services/contentful/contentful.service';
import {NavigationEnd, Router} from '@angular/router';
import {Page} from '../../model/page.model';
import {Appointment} from '../../model/appointment.model';
import {Article} from '../../model/article.model';

@Component({
  selector: 'abi-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  appointments: Appointment[];
  latestNews: Article[];
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

  constructor(private ctfSvc: ContentfulService, private router: Router) {
    ctfSvc.getMainPages().then((pages: Page[]) => {
      this.sections = pages;
    });

    ctfSvc.getFooterPages().then((pages: Page[]) => {
      this.footerPages = pages;
    });

    ctfSvc.getUpcomingAppointments().then((appts: Appointment[]) => {
      this.appointments = appts;
    });

    ctfSvc.getLatestArticles().then((articles: Article[]) => {
      this.latestNews = articles;
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          setTimeout(() => {
            const element = document.getElementById(tree.fragment);
            if (element) { element.scrollIntoView(); }
          }, 200);
        }
      }
    });
  }
}
