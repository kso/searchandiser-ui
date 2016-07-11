import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/template-component.html')
export class DetailsComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-details',
      attach: 'details',
      display: 'Details Component'
    });
  }

  example = `${this.name.attach}.html`;
  options = [
    {
      key: 'idParam',
      type: 'string',
      default: 'id',
      description: 'The query parameter to pull the record id from.'
    }
  ];
  structure = {
    'riot-template': `
    <${this.name.riot}>
      <h1>{ record.allMeta['title'] }</h1>
      <h2>{ record.allMeta[struct.price] }</h2>
      <img riot-src="{ record.allMeta[struct.image] }" />
    </${this.name.riot}>
    `,
    compiled: `
    <${this.name.riot}>
      <h1>Marin Blue Small Oval Platter</h1>
      <h2>29.95</h2>
      <img src="example.com/path/to/image.png" />
    </${this.name.riot}>
    `
  };

  created() {
    window.location.search = 'id=469354'
  }

  attached() {
    searchandiser.attach(this.name.attach);
  }
}
