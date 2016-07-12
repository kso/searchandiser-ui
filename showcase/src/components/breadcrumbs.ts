import { useView } from 'aurelia-framework';
import { SimpleComponent } from './simple';

@useView('components/simple-component.html')
export class BreadcrumbsComponent extends SimpleComponent {

  constructor() {
    super({
      riot: 'gb-breadcrumbs',
      attach: 'breadcrumbs',
      display: 'Breadcrumbs Component'
    });
  }

  options = [
    {
      key: 'hideQuery',
      type: 'boolean',
      default: false,
      description: 'Set to true to hide the current query from the breadcrumbs.'
    },
    {
      key: 'hideRefinements',
      type: 'boolean',
      default: false,
      description: 'Set to true to hide refinemented from the breadcrumbs.'
    }
  ];
  structure = `
  <${this.name.riot}>
    <ul class="${this.name.riot}">
      <li>couch</li>
      <li>
        <ul class="gb-nav-crumb">
          <gb-refinement-crumb>
            <li class="gb-refinement-crumb">
              <a>&times;</a> <b>Category: Furniture</b>
            </li>
          </gb-refinement-crumb>
        </ul>
      </li>
      <li>
        <ul class="gb-nav-crumb">
          <gb-refinement-crumb>
            <li class="gb-refinement-crumb">
              <a>&times;</a> <b>Colour: red</b>
            </li>
          </gb-refinement-crumb>
          <gb-refinement-crumb>
            <li class="gb-refinement-crumb">
              <a>&times;</a> <b>Colour: marooon</b>
            </li>
          </gb-refinement-crumb>
        </ul>
      </li>
    </ul>
  </${this.name.riot}>
  `;

  attached() {
    searchandiser.attach(this.name.attach);
    searchandiser.flux.emit(searchandiser.flux.RESULTS, { originalQuery: 'couch' });
    searchandiser.flux.emit(searchandiser.flux.REFINEMENTS_CHANGED, {
      selected: [
        {
          displayName: 'Category',
          refinements: [{ type: 'Value', value: 'Furniture' }]
        },
        {
          displayName: 'Colour',
          refinements: [
            { type: 'Value', value: 'red' },
            { type: 'Value', value: 'maroon' },
          ]
        }
      ]
    });
  }
}
