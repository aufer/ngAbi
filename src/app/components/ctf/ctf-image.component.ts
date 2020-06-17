import {CtfBaseComponent} from "./ctf-base.component";
import {Component}        from "@angular/core";

@Component({
    selector: 'ctf-image',
    template: `
        <figure>
            <img [src]="content.data.url">
            <figcaption>{{content.data.caption}}</figcaption>
        </figure>
    `,
})
export class CtfImageComponent extends CtfBaseComponent {}
