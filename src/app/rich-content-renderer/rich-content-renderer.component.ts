import {Component, Input} from '@angular/core';

@Component({
  selector: 'abi-rich-content',
  templateUrl: './rich-content-renderer.component.html'
})
export class RichContentRendererComponent {

  @Input()
  content: any;

  isBold(p) {
    return p.marks.indexOf('bold') > -1;
  }

  isItalic(p) {
    return p.marks.indexOf('italic') > -1;
  }
}
