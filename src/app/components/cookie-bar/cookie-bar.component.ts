import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'abi-cookie-bar',
  templateUrl: './cookie-bar.component.html',
  styleUrls: ['./cookie-bar.component.scss']
})
export class CookieBarComponent implements OnInit {

  @Input()
  privacyTermsTarget: string;

  @Output()
  accepted = new EventEmitter<boolean>();

  @HostBinding('class.done')
  selectionOccured = false;

  select(selection: boolean) {
    this.accepted.next(selection);
    this.selectionOccured = true;
  }
}
