import {Component} from '@angular/core';
import {ContentfulService} from '../../services/contentful/contentful.service';
import {Article} from '../../model/article.model';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'abi-news',
  templateUrl: './news.component.html'
})
export class NewsComponent {

  articles: Article[];

  constructor(private ctfSvc: ContentfulService, private router: Router) {
    this.ctfSvc.getArticles().then(articles => this.articles = articles);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          setTimeout(() => {
            const element = document.querySelector('#' + tree.fragment);
            if (element) { element.scrollIntoView(); }
          }, 200);
        }
      }
    });
  }
}
