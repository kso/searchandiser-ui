import { Filter } from '../../src/tags/filter/gb-filter';
import suite, { SelectModel } from './_suite';
import { expect } from 'chai';

suite<Filter>('gb-filter', ({
  flux, html, mount, sandbox,
  itMountsTag
}) => {

  itMountsTag();

  describe('render', () => {
    it('renders as select', () => {
      const tag = mount();

      expect(tag.root.querySelector('gb-select')).to.be.ok;
    });
  });

  describe('render with navigation', () => {
    const NAVIGATION = {
      name: 'brand',
      refinements: [{
        type: 'Value',
        value: 'DeWalt'
      }]
    };
    let tag: Filter;
    let model: Model;

    beforeEach(() => {
      tag = mount();
      model = new Model(tag);
      tag.services.filter = <any>{ isTargetNav: () => true };
      tag.updateValues(<any>{ availableNavigation: [NAVIGATION] });
    });

    it('should render options', () => {
      expect(html().querySelector('gb-option-list')).to.be.ok;
      expect(model.label.textContent).to.eq('Filter');
      expect(model.options).to.have.length(1);
      expect(model.options[0].textContent).to.eq('DeWalt');
    });

    describe('clear option', () => {
      it('should not render clear option', () => {
        expect(model.clearOption).to.not.be.ok;
      });

      it('should render clear option when selected', () => {
        model.options[0].click();

        expect(model.clearOption.textContent).to.eq('Unfiltered');
      });

      it('should call flux.unrefine() on click', (done) => {
        const unrefineStub = sandbox().stub(flux(), 'unrefine');
        const refineStub = sandbox().stub(flux(), 'refine');
        flux().results = <any>{ availableNavigation: [NAVIGATION] };
        flux().reset = () => done();
        model.options[0].click();

        model.clearOption.click();

        expect(refineStub.called).to.be.true;
        expect(unrefineStub.calledWith(tag.selected)).to.be.true;
      });
    });
  });
});

class Model extends SelectModel<Filter> {

}
