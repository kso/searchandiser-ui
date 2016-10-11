import { DEFAULT_CONFIG, Paging } from '../../../src/tags/paging/gb-paging';
import suite from './_suite';
import { expect } from 'chai';
import { Events } from 'groupby-api';

const struct = { title: 'title', price: 'price', image: 'image', url: 'url' };
const allMeta = {
  title: 'Red Sneakers',
  price: '$12.45',
  image: 'image.png',
  id: '1340',
  nested: {
    value: '6532'
  }
};

suite('gb-paging', Paging, { parent: { struct, allMeta } }, ({
  flux, tag,
  expectSubscriptions,
  itShouldConfigure
}) => {

  describe('init()', () => {
    itShouldConfigure(DEFAULT_CONFIG);

    it('should have default initial state', () => {
      tag().init();

      expect(tag().currentPage).to.eq(1);
      expect(tag().backDisabled).to.be.true;
    });

    it('should wrap flux.page as pager', () => {
      const fluxPager: any = { a: 'b' };
      const wrappedPager: any = { c: 'd' };
      flux().page = fluxPager;
      tag().wrapPager = (pager) => {
        expect(pager).to.eq(fluxPager);
        return wrappedPager;
      };

      tag().init();

      expect(tag().pager).to.eq(wrappedPager);
    });

    it('should listen for events', () => {
      expectSubscriptions(() => tag().init(), {
        [Events.PAGE_CHANGED]: tag().updateCurrentPage,
        [Events.RESULTS]: tag().pageInfo
      });
    });
  });

  describe('pageInfo()', () => {
    it('should update page position', () => {
      const pageNumbers = [1, 2, 3, 4, 5];
      const limit = 7;
      tag()._config = { limit };
      flux().page = <any>{
        pageNumbers: (pages) => {
          expect(pages).to.eq(limit);
          return pageNumbers;
        },
        currentPage: 9,
        finalPage: 16
      };
      tag().updatePageInfo = (pages, current, last): any => {
        expect(pages).to.eq(pageNumbers);
        expect(current).to.eq(9);
        expect(last).to.eq(16);
      };

      tag().pageInfo();
    });
  });

  describe('updatePageInfo()', () => {
    it('should update page info', () => {
      tag().update = (obj: any) => {
        expect(obj.backDisabled).to.be.false;
        expect(obj.forwardDisabled).to.be.true;
        expect(obj.lowOverflow).to.be.false;
        expect(obj.highOverflow).to.be.true;
        expect(obj.pageNumbers).to.eql([1, 2, 3, 4, 5, 6]);
        expect(obj.lastPage).to.eq(43);
        expect(obj.currentPage).to.eq(43);
      };

      tag().updatePageInfo([1, 2, 3, 4, 5, 6], 43, 43);
    });

    it('should set lowOverflow and highOverflow true', () => {
      tag().update = (obj: any) => {
        expect(obj.lowOverflow).to.be.true;
        expect(obj.highOverflow).to.be.true;
      };

      tag().updatePageInfo([2, 3, 4], 1, 6);
    });

    it('should set lowOverflow and highOverflow to false', () => {
      tag().update = (obj: any) => {
        expect(obj.lowOverflow).to.be.false;
        expect(obj.highOverflow).to.be.false;
      };

      tag().updatePageInfo([1, 2, 3, 4], 1, 4);
    });

    it('should set backDisabled and forwardDisabled to true', () => {
      tag().update = (obj: any) => {
        expect(obj.backDisabled).to.be.true;
        expect(obj.forwardDisabled).to.be.true;
      };

      tag().updatePageInfo([1], 1, 1);
    });

    it('should set backDisabled and forwardDisabled to false', () => {
      tag().update = (obj: any) => {
        expect(obj.backDisabled).to.be.false;
        expect(obj.forwardDisabled).to.be.false;
      };

      tag().updatePageInfo([1, 2, 3], 2, 3);
    });
  });

  describe('updateCurrentPage()', () => {
    it('should update current page', () => {
      tag().update = (obj) => expect(obj.currentPage).to.eq(10);

      tag().updateCurrentPage({ pageNumber: 10 });
    });
  });

  describe('wrapPager()', () => {
    it('should not allow page forward', () => {
      tag().forwardDisabled = true;

      const pager = tag().wrapPager(<any>{
        next: () => expect.fail(),
        last: () => expect.fail()
      });

      pager.next();
      pager.last();
    });

    it('should not allow page backward', () => {
      tag().backDisabled = true;

      const pager = tag().wrapPager(<any>{
        prev: () => expect.fail(),
        first: () => expect.fail()
      });

      pager.prev();
      pager.first();
    });

    it('should switch to the given page', () => {
      const newPage = 7;

      const pager = tag().wrapPager(<any>{
        switchPage: (page) => expect(page).to.eq(newPage)
      });

      pager.switchPage(newPage);
    });
  });
});
