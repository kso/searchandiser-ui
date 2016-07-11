import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/template-component.html')
export class RecordCountComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-record-count',
      attach: 'record-count',
      display: 'Record Count Display'
    });
  }

  example = `${this.name.attach}.html`;
  structure = {
    'riot-template': `
    <${this.name.riot}>
      <h2>{ first } - { last } of { total } Products</h2>
    </${this.name.riot}>
    `,
    compiled: `
    <${this.name.riot}>
      <h2>21 - 30 of 2187 Products</h2>
    </${this.name.riot}>
    `
  };

  attached() {
    searchandiser.attach(this.name.attach);
    searchandiser.flux.emit(searchandiser.flux.RESULTS, {
      totalRecordCount: 2187,
      pageInfo: {
        recordStart: 21,
        recordEnd: 30
      }
    });
  }
}
