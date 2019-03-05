import {Component, Input} from '@angular/core';

@Component({
  selector: 'abi-rich-content',
  templateUrl: './rich-content-renderer.component.html'
})
export class RichContentRendererComponent {

  @Input()
  content: any;
}
