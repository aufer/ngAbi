import {Component, Input} from "@angular/core";
import {Page}             from "../../model/page.model";

@Component({
    selector: 'abi-page',
    templateUrl: 'page.component.html'
})
export class PageComponent {
    @Input()
    section: Page;

    @Input()
    even: boolean;
}
