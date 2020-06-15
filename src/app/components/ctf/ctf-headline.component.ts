import {CtfBaseComponent} from "./ctf-base.component";
import {Component}        from "@angular/core";

@Component({
    selector: 'ctf-headline',
    template: `
        <h3 *ngIf="content.type === 'heading-3'">{{content.elements[0].value}}</h3>
        <h4 *ngIf="content.type === 'heading-4'">{{content.elements[0].value}}</h4>
        <h5 *ngIf="content.type === 'heading-5'">{{content.elements[0].value}}</h5>
        <h6 *ngIf="content.type === 'heading-6'">{{content.elements[0].value}}</h6>
    `,
})
export class CtfHeadlineComponent extends CtfBaseComponent {}
