import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/simple-component.html')
export class DidYouMeanComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-did-you-mean',
      attach: 'did-you-mean',
      display: 'Did You Mean Component'
    });
  }

  structure = `
  <${this.name.riot}>
    <ul class="${this.name.riot}">
      <li class="gb-did-you-mean__option">
        <a>teal</a>
      </li>
      <li class="gb-did-you-mean__option">
        <a>teak</a>
      </li>
    </ul>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach);
    searchandiser.flux.emit(searchandiser.flux.RESULTS, {
      didYouMean: [
        'teal',
        'teak',
        'team'
      ]
    });
  }
}
