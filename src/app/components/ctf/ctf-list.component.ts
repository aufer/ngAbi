import {CtfBaseComponent} from "./ctf-base.component";
import {Component}        from "@angular/core";

@Component({
    selector: 'ctf-list',
    template: `
        <ul *ngIf="content.type === 'unordered-list'" class="list list--unordered">
            <ctf-list-items [content]="content"></ctf-list-items>
        </ul>
        <ol *ngIf="content.type === 'ordered-list'" class="list list--ordered">
            <ctf-list-items [content]="content"></ctf-list-items>
        </ol>
    `,
})
export class CtfListComponent extends CtfBaseComponent {}

@Component({
    selector: 'ctf-list-items',
    template: `
        <li *ngFor="let item of content.elements" class="list__item">
            <ng-container *ngFor="let subItem of item.content">
                <ng-container *ngFor="let p of subItem.content">
                    <ctf-rich-content [content]="p"></ctf-rich-content>
<!--                    <ng-container *ngIf="p.type === 'text'">{{p.value}}</ng-container>-->
<!--                    <a *ngIf="p.type === 'hyperlink'" [href]="p.raw.data.uri">{{p.raw.content[0].value}}</a>-->
<!--                    <a *ngIf="p.type === 'asset-hyperlink'" [href]="p.raw.data.target.fields?.file.url">{{p.raw.content[0].value}}</a>-->
                </ng-container>
            </ng-container>
        </li>
    `,
})
export class CtfListItemsComponent extends CtfBaseComponent {}
