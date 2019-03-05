import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs/index';

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

  captionChanging: boolean;

  currentSlide: Slide;

  private sliderInterval;

  ngOnInit() {
    if (!this.sliderData) return;
    this.startSlider();
  }

  private startSlider() {
    this.setSlide();
    interval(this.duration).subscribe(() => {
      this.setSlide();
    })
  }

  private setSlide() {
    this.captionChanging = true;
    setTimeout(() => this.captionChanging = false, 1000);

    if (!this.currentSlide) {
      this.currentSlide = this.sliderData[0];
    }
    const currentIdx = this.sliderData.indexOf(this.currentSlide);
    const nextIdx = currentIdx === this.sliderData.length - 1 ? 0 : currentIdx + 1;

    this.currentSlide = this.sliderData[nextIdx];
  }

}
