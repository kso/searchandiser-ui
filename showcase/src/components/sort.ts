import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/native-component.html')
export class SortComponent extends SimpleComponent {
  constructor() {
    super({
      riot: 'gb-sort',
      attach: 'sort',
      display: 'Sort Dropdown'
    });
  }

  options = [
    {
      key: 'label',
      type: 'string',
      default: 'Sort',
      description: 'This will appear on the dropdown when no value is selected.'
    },
    {
      key: 'clear',
      type: 'string',
      default: 'Unsorted',
      description: 'When sort can be un-set, this will appear as an option to clear the selected sort.'
    },
    {
      key: 'native',
      type: 'boolean',
      default: false,
      description: 'Set to true to use the HTML select element'
    },
    {
      key: 'onHover',
      type: 'boolean',
      default: true,
      description: 'Set to false to require clicking to show and hide the dropdown. (Custom rendering only.)'
    },
    {
      key: 'options',
      type: 'array',
      default: '[]',
      description: 'A list of options for sorting the page.',
      sub: [
        {
          key: 'label',
          type: 'string',
          default: '-',
          description: 'How this option should appear in the dropdown.'
        },
        {
          key: 'value',
          type: 'object',
          default: '-',
          description: 'The sort that will be applied.',
          sub: [
            {
              key: 'field',
              type: 'string',
              description: 'The field to sort on.'
            },
            {
              key: 'order',
              type: 'enum',
              options: ['Ascending', 'Descending'],
              description: 'Sort on the field in dscending or descending order.'
            }
          ]
        }
      ]
    }
  ];
  structure = {
    native: `
    <${this.name.riot}>
      <gb-select class="${this.name.riot}">
        <select name="nativeSelect">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
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
            <a>Option 1</a>
            <a>Option 2</a>
            <a>Option 3</a>
          </div>
        </div>
      </gb-select>
    </${this.name.riot}>
    `
  };

  attached() {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    searchandiser.attach(this.name.attach, `.${this.name.attach}--native`, { native: true, options });
    searchandiser.attach(this.name.attach, `.${this.name.attach}--custom`, { options });
  }
}
