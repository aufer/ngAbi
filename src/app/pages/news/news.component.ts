import {Component, OnInit} from '@angular/core';
import {ContentfulService} from '../../services/contentful/contentful.service';
import {Article} from '../../model/article.model';

@Component({
  selector: 'abi-contact',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  articles: Article[];

  constructor(private ctfSvc: ContentfulService) {
    this.ctfSvc.getArticles().then(articles => this.articles = articles);
  }
}
