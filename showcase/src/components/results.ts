import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';
import { OPTIONS, RECORDS } from './raw-results';

@useView('components/simple-component.html')
export class ResultsComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-results',
      attach: 'results',
      display: 'Results Component'
    });
  }

  options = OPTIONS;
  structure = `
  <${this.name.riot}>
    <gb-raw-results>
      <ul class="${this.name.riot}">
        <li class="gb-results__item">
          <div class="gb-product">
            <gb-product>
              <a class="gb-product__image-link" href="details.html?id=141464">
                <img src="example.com/path/to/image.png" />
              </a>
              <a class="gb-product__info-link" href="details.html?id=141464">
                <p>Marin White Pasta-Low Bowl</p>
                <p>9.95</p>
              </a>
            </gb-product>
          </div>
        </li>
        <li class="gb-results__item">
          ...2nd Product...
        </li>
        <li class="gb-results__item">
          ...3rd Product...
        </li>
      </ul>
    </gb-raw-results>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach);
    searchandiser.flux.emit(searchandiser.flux.RESULTS, { records: RECORDS });
  }
}
