import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/simple-component.html')
export class PagingComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-paging',
      attach: 'paging',
      display: 'Paging Component'
    });
  }

  options = [
    {
      key: 'limit',
      type: 'number',
      default: 5,
      description: 'The number of pages links to have visible at once.'
    },
    {
      key: 'showPages',
      type: 'boolean',
      default: false,
      description: 'Set to true to show the page links.'
    },
    {
      key: 'showTerminals',
      type: 'boolean',
      default: true,
      description: 'Set to false to hide the terminal (first page and last page) links.'
    }
  ];
  structure = `
  <${this.name.riot}>
    <div class="${this.name.riot}">
      <a class="gb-paging__link first [disabled]"><span class="gb-paging__icon">&larr;</span> First</a>
      <a class="gb-paging__link prev [disabled]"><span class="gb-paging__icon">&lt;</span> Prev</a>
      <ul class="gb-paging__pages">
        <span class="gb-paging__ellipsis">&hellip;</span>
        <li>
          <a class="gb-paging__page [selected]">3</a>
          <a class="gb-paging__page [selected]">4</a>
          <a class="gb-paging__page [selected]">5</a>
          <a class="gb-paging__page [selected]">6</a>
          <a class="gb-paging__page [selected]">7</a>
        </li>
        <span class="gb-paging__ellipsis">&hellip;</span>
      </ul>
      <a class="gb-paging__link next [disabled]">Next <span class="gb-paging__icon">&gt;</span></a>
      <a class="gb-paging__link last [disabled]">Last <span class="gb-paging__icon">&rarr;</span></a>
    </div>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach, `.${this.name.attach}`, { showPages: true });
  }
}
