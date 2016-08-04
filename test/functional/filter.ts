import { FluxCapacitor, Events, Results } from 'groupby-api';
import { expect } from 'chai';
import { mockFlux } from '../fixtures';
import { selectOptions, clearOption } from '../utils/select';
import { Filter } from '../../src/tags/filter/gb-filter';
import '../../src/tags/filter/gb-filter.tag';

const TAG = 'gb-filter';

describe('gb-filter tag', () => {
  let html: Element;
  let flux: FluxCapacitor;
  beforeEach(() => {
    flux = new FluxCapacitor('');
    document.body.appendChild(html = document.createElement(TAG));
  });
  afterEach(() => document.body.removeChild(html));

  it('mounts tag', () => {
    const tag = mount();

    expect(tag).to.be.ok;
    expect(html.querySelector('gb-raw-filter')).to.be.ok;
  });

  describe('render behaviour', () => {
    const navigation = {
      name: 'brand',
      refinements: [{
        type: 'Value',
        value: 'DeWalt'
      }]
    };

    it('renders from navigation', () => {
      const tag = mount();
      rawTag().isTargetNav = () => true;
      rawTag().updateValues(<Results & any>{ availableNavigation: [navigation] });

      expect(selectOptions().length).to.eq(1);
      expect(selectOptions()[0].textContent).to.eq('DeWalt');
    });

    it('renders clear option', () => {
      const tag = mount();
      rawTag().isTargetNav = () => true;
      rawTag().updateValues(<Results & any>{ availableNavigation: [navigation] });

      flux.refine = () => null;

      selectOptions()[0].click();
      expect(clearOption().textContent).to.eq('Unfiltered');
    });
  });

  function rawTag() {
    return <Filter>html.querySelector('gb-raw-filter')['_tag'];
  }

  function mount() {
    return <Filter>riot.mount(TAG, { flux, clone: () => flux })[0];
  }
});