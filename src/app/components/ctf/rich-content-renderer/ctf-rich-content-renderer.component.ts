import {ChangeDetectionStrategy, Component}        from '@angular/core';
import {CtfBaseComponent} from "../ctf-base.component";

@Component({
  selector: 'ctf-rich-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ctf-rich-content-renderer.component.html'
})
export class CtfRichContentRendererComponent extends CtfBaseComponent {}
