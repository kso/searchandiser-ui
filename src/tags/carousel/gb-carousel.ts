import { unless } from '../../utils/common';
import { FluxTag } from '../tag';

export interface CarouselConfig {
  options: any[];
}

export interface Carousel extends FluxTag<CarouselConfig> { }

export class Carousel {

  currentIndex: number;
  options: any[];

  init() {
    this.configure();
    this.currentIndex = 0;
    this.options = unless(this._config.options, this._scope.options, []);
  }

  isSelected(index: number) {
    return this.currentIndex === index;
  }

  next() {
    this.update({ currentIndex: Math.min(this.currentIndex + 1, this.options.length - 1) });
  }

  prev() {
    this.update({ currentIndex: Math.max(this.currentIndex - 1, 0) });
  }

}
