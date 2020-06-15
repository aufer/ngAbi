import {NgModule}                                from "@angular/core";
import {CommonModule}                            from "@angular/common";
import {RouterModule}                            from "@angular/router";
import {CtfTextComponent}                        from "./ctf-text.component";
import {CtfRichContentRendererComponent}         from "./rich-content-renderer/ctf-rich-content-renderer.component";
import {CtfHeadlineComponent}                    from "./ctf-headline.component";
import {CtfHyperlinkComponent}                   from "./ctf-hyperlink.component";
import {CtfListComponent, CtfListItemsComponent} from "./ctf-list.component";
import {CtfImageComponent}                       from "./ctf-image.component";

const components = [
    CtfHeadlineComponent,
    CtfHyperlinkComponent,
    CtfImageComponent,
    CtfListComponent,
    CtfRichContentRendererComponent,
    CtfTextComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        components,
        CtfListItemsComponent,
    ],
    exports: components,
})
export class CtfComponentsModule {
}
