import {BrowserModule} from '@angular/platform-browser';
import {NgModule}      from '@angular/core';

import {AppComponent}          from './app.component';
import {ContentfulModule}      from './services/contentful/contentful.module';
import {SliderComponent}       from './components/slider/slider.component';
import {MainComponent}         from './pages/main/main.component';
import {ImprintComponent}      from './pages/imprint/imprint.component';
import {NewsComponent}         from './pages/news/news.component';
import {Route, RouterModule}   from '@angular/router';
import {PrivacyComponent}      from './pages/privacy/privacy.component';
import {TrackingService}       from './services/tracking.service';
import {CookieBarComponent}    from './components/cookie-bar/cookie-bar.component';
import {WINDOW, windowFactory} from './services/window.provider';
import {CtfComponentsModule}   from "./components/ctf/ctf-components.module";
import {PageComponent}         from "./components/page/page.component";
import {FormsPageComponent}    from "./pages/forms/forms-page.component";
import {ReactiveFormsModule}   from "@angular/forms";

const routes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'start'},
    {path: 'start', component: MainComponent},
    {path: 'impressum', component: ImprintComponent},
    {path: 'datenschutz', component: PrivacyComponent},
    {path: 'aktuelles', component: NewsComponent},
    {path: 'formulare/:type', component: FormsPageComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        SliderComponent,
        MainComponent,
        ImprintComponent,
        NewsComponent,
        PrivacyComponent,
        CookieBarComponent,
        PageComponent,
        FormsPageComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ContentfulModule,
        CtfComponentsModule,
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
