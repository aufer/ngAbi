import {Input} from "@angular/core";

export abstract class CtfBaseComponent {
    @Input()
    public content: any;
}
