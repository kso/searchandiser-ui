import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/simple-component.html')
export class RelatedSearchesComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-related-searches',
      attach: 'related-searches',
      display: 'Related Searches Component'
    });
  }

  structure = `
  <${this.name.riot}>
    <ul class="${this.name.riot}">
      <li class="gb-related-search">
        <a class="gb-related-search__link">Blu-Ray Player</a>
      </li>
      <li class="gb-related-search">
        <a class="gb-related-search__link">Bluetooth Headphones</a>
      </li
      <li class="gb-related-search">
        <a class="gb-related-search__link">Blue Piston</a>
      </li>
    </ul>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach);
    searchandiser.flux.emit(searchandiser.flux.RESULTS, {
      relatedQueries: [
        'Blu-Ray Player',
        'Bluetooth Headphones',
        'Blue Piston'
      ]
    });
  }
}
