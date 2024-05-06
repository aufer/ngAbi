import {CtfBaseComponent} from "./ctf-base.component";
import {ChangeDetectionStrategy, Component}        from "@angular/core";

@Component({
    selector: 'ctf-hyperlink',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="content.type === 'hyperlink'">
            <a *ngIf="content.raw.data.uri.startsWith('/')" [routerLink]="content.raw.data.uri.split('#')[0]"
               [fragment]="content.raw.data.uri.split('#')[1]"
                class="link link--hyperlink">{{content.raw.content[0].value}}</a>
            <a *ngIf="!content.raw.data.uri.startsWith('/')" class="externer" [href]="buildExternalUri(content.raw.data.uri)">{{content.raw.content[0].value}}</a>

        </ng-container>
        <a *ngIf="content.type === 'asset-hyperlink'" [href]="content.raw.data.target.fields?.file.url"
           target="_blank"
           class="link link--external">{{content.content[0].value}}</a>
    `,
})
export class CtfHyperlinkComponent extends CtfBaseComponent {

    buildExternalUri(uri: string) {
        return uri && uri.startsWith('http') ? uri : 'http://' + uri;
    }
}
