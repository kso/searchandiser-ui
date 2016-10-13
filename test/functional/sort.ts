import { Sort } from '../../src/tags/sort/gb-sort';
import suite, { SelectModel } from './_suite';
import { expect } from 'chai';

suite<Sort>('gb-sort', ({ flux, mount, stub, itMountsTag }) => {

  itMountsTag();

  describe('render', () => {
    it('should render as select', () => {
      const tag = mount();

      expect(tag).to.be.ok;
      expect(tag.root.querySelector('gb-select')).to.be.ok;
    });
  });

  describe('render with sorts', () => {
    it('should render options list', () => {
      const tag = mount();
      const model = new Model(tag);

      expect(tag.root.querySelector('gb-option-list')).to.be.ok;
      expect(model.label.textContent).to.eq('Name Descending');
      expect(model.options).to.have.length(2);
      expect(model.options[1].textContent).to.eq('Name Ascending');
    });

    it('should call flux.sort() on click', () => {
      const model = new Model(mount());
      const sort = stub(flux(), 'sort');

      model.options[1].click();

      expect(model.clearOption).to.not.be.ok;
      expect(sort.calledWith({ field: 'title', order: 'Ascending' })).to.be.true;
    });
  });
});

class Model extends SelectModel<Sort> { }
