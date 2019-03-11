import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContentfulModule} from './services/contentful/contentful.module';
import {SliderComponent} from './components/slider/slider.component';
import {MainComponent} from './pages/main/main.component';
import {ImprintComponent} from './pages/imprint/imprint.component';
import {NewsComponent} from './pages/news/news.component';
import {Route, RouterModule} from '@angular/router';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {RichContentRendererComponent} from './components/rich-content-renderer/rich-content-renderer.component';
import {TrackingService} from './services/tracking.service';
import {CookieBarComponent} from './components/cookie-bar/cookie-bar.component';
import {WINDOW, windowFactory} from './services/window.provider';

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
    RichContentRendererComponent,
    CookieBarComponent
  ],
  imports: [
    BrowserModule,
    ContentfulModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  ],
  providers: [
    {
      provide: WINDOW,
      useFactory: windowFactory
    },
    TrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
