import {Component}        from "@angular/core";
import {CtfBaseComponent} from "./ctf-base.component";

@Component({
    selector: 'ctf-text',
    template: `
        <ng-container *ngIf="content.marks.length === 0">{{content.value}}</ng-container>
        <ng-container *ngIf="isBold()"><strong>{{content.value}}</strong></ng-container>
        <ng-container *ngIf="isItalic()"><i>{{content.value}}</i></ng-container>
    `,
})
export class CtfTextComponent extends CtfBaseComponent {

    isBold() {
        return this.content.marks.indexOf('bold') > -1;
    }

    isItalic() {
        return this.content.marks.indexOf('italic') > -1;
    }
}
