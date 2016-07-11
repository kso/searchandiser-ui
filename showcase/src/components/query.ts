import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';
import { OPTIONS } from './raw-query';

@useView('components/simple-component.html')
export class QueryComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-query',
      attach: 'query',
      display: 'Query Component'
    });
  }

  options = OPTIONS;
  structure = `
  <${this.name.riot}>
    <div class="${this.name.riot}">
      <input type="text" class="gb-query__box" name="searchBox">
      <a class="gb-query__reset">&times;</a>
    </div>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach);
  }
}
