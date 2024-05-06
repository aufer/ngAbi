import {CtfBaseComponent} from "./ctf-base.component";
import {ChangeDetectionStrategy, Component}        from "@angular/core";

@Component({
    selector: 'ctf-image',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <figure>
            <img [src]="content.data.url">
            <figcaption>{{content.data.caption}}</figcaption>
        </figure>
    `,
})
export class CtfImageComponent extends CtfBaseComponent {}
