import {Component, Input, OnInit} from '@angular/core';

export interface Slide {
  title: string;
  caption: string;
  url: string;
}

@Component({
  selector: 'abi-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input()
  sliderData: Slide[];

  @Input()
  duration = 7000;

  @Input()
  isHero = false;

  currentSlide: Slide;

  private sliderInterval;

  ngOnInit() {
    if (!this.sliderData) return;

    this.currentSlide = this.sliderData[0];

    this.sliderInterval = setInterval(() => {
      const currentIdx = this.sliderData.indexOf(this.currentSlide);
      const nextIdx = currentIdx === this.sliderData.length - 1 ? 0 : currentIdx + 1;

      this.currentSlide = this.sliderData[nextIdx];
    }, this.duration);
  }

}
