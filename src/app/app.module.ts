import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContentfulModule} from './contentful/contentful.module';
import { SliderComponent } from './slider/slider.component';
import { MainComponent } from './pages/main/main.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { NewsComponent } from './pages/news/news.component';
import {Route, RouterModule} from '@angular/router';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import {RichContentRendererComponent} from './rich-content-renderer/rich-content-renderer.component';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'index.html'},
  {path: 'index.html', component: MainComponent},
  {path: 'impressum.html', component: ImprintComponent},
  {path: 'datenschutz.html', component: PrivacyComponent},
  {path: 'aktuelles.html', component: NewsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    MainComponent,
    ImprintComponent,
    NewsComponent,
    PrivacyComponent,
    RichContentRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentfulModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
