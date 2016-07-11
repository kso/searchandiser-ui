import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/native-component.html')
export class PageSizeComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-page-size',
      attach: 'page-size',
      display: 'Page Size Dropdown'
    });
  }

  options = [
    {
      key: 'native',
      type: 'boolean',
      default: false,
      description: 'Set to true to use the native HTML select element.'
    },
    {
      key: 'onHover',
      type: 'boolean',
      default: true,
      description: 'Set to false to require clicking to show and hide the dropdown. (Custom rendering only.)'
    },
    {
      key: 'resetOffset',
      type: 'boolean',
      default: false,
      description: 'Set to true to reset paging to 0 when a new page size is selected.'
    },
    {
      key: 'pageSizes',
      type: 'array',
      default: '[10, 25, 50, 100]',
      description: 'A list of options for page size.'
    }
  ];
  structure = {
    native: `
    <${this.name.riot}>
      <gb-select class="${this.name.riot}">
        <select name="nativeSelect">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </gb-select>
    </${this.name.riot}>
    `,
    custom: `
    <${this.name.riot}>
      <gb-select class="${this.name.riot}">
        <div class="gb-select">
          <button type="button" class="gb-select__button">
            <span>{ label }</span>
            <img class="gb-select__arrow">
          </button>
          <div class="gb-select__content">
            <a>10</a>
            <a>25</a>
            <a>50</a>
            <a>100</a>
          </div>
        </div>
      </gb-select>
    </${this.name.riot}>
    `
  };

  attached() {
    searchandiser.attach(this.name.attach, `.${this.name.attach}--native`, { native: true });
    searchandiser.attach(this.name.attach, `.${this.name.attach}--custom`);
  }
}
