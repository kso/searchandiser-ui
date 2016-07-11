import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

export const OPTIONS = [
  {
    key: 'autoSearch',
    type: 'boolean',
    default: true,
    description: `Set to true to disable updating the results directly as you type.
      Results will update when the user presses enter. Note: this is not the same as SAYT.`
  },
  {
    key: 'staticSearch',
    type: 'boolean',
    default: false,
    description: `With autoSearch set to false, set this to true to redirect to a page
      with the current value as a query parameter when the user presses enter.`
  },
  {
    key: 'searchUrl',
    type: 'string',
    default: 'search',
    description: `When using staticSearch, the search path to use. Note that it is relative by default.`
  },
  {
    key: 'queryParam',
    type: 'string',
    default: 'q',
    description: `When using staticSearch, the query parameter to pass the search query with.`
  },
  {
    key: 'sayt',
    type: 'boolean',
    default: true,
    description: 'Set to false to disable SAYT.'
  }
];

@useView('components/template-component.html')
export class RawQueryComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-raw-query',
      attach: 'raw-query',
      display: 'Raw Query Component'
    });
  }

  example = `${this.name.attach}.html`;
  options = OPTIONS;
  structure = {
    'riot-template': `
    <${this.name.riot}>
      <input type="text" class="${this.name.attach}">
    </${this.name.riot}>
    `,
    compiled: `
    <${this.name.riot}>
      <input type="text" class="gb-query__box">
    </${this.name.riot}>
    `
  };

  attached() {
    searchandiser.attach(this.name.attach);
  }
}
