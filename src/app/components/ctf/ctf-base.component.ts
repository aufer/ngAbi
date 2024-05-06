import {Directive, Input} from "@angular/core";

@Directive()
export abstract class CtfBaseComponent {
    private _content: any;

    @Input()
    public set content(content: any) {
        this._content = content
    }

    public get content(): any {
        return this._content;
    }
}
