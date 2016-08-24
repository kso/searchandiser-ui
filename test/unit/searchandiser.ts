import { FluxCapacitor } from 'groupby-api';
import { Searchandiser } from '../../src/searchandiser';
import { expect } from 'chai';
import riot = require('riot');
import '../../src/tags/query/gb-query.tag';

describe('searchandiser', () => {
  let sandbox: Sinon.SinonSandbox;
  let searchandiser: Searchandiser;
  let flux;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    searchandiser = Object.assign(new Searchandiser(), {
      flux: flux = new FluxCapacitor(''),
      config: {}
    });
  });

  afterEach(() => sandbox.restore());

  it('should perform an initial search', (done) => {
    searchandiser.config = <any>{ initialSearch: true };
    searchandiser.search = () => done();

    searchandiser.init();
  });

  it('should not perform an initial search', () => {
    searchandiser.config = <any>{ initialSearch: false };
    searchandiser.search = (): any => expect.fail();

    searchandiser.init();
  });

  describe('attach logic', () => {
    it('should mount tag with full name', () => {
      const tagName = 'gb-my-tag';
      sandbox.stub(riot, 'mount', (tag, opts) => {
        expect(tag).to.eq(tagName);
        expect(opts).to.eql({});
      });

      const tags = searchandiser.attach(tagName);
      expect(tags).to.be.null;
    });

    it('should mount tag with simple name', () => {
      sandbox.stub(riot, 'mount', (tag) => expect(tag).to.eq('gb-my-tag'));

      searchandiser.attach('my-tag');
    });

    it('should mount tag with opts', () => {
      const tagName = 'gb-my-tag';
      const options = { a: 'b', c: 'd' };
      sandbox.stub(riot, 'mount', (tag, opts) => expect(opts).to.eq(options));

      searchandiser.attach(tagName, options);
    });

    it('should mount with CSS selector', () => {
      const tagName = 'gb-my-tag';
      const css = '.gb-my.tag';
      sandbox.stub(riot, 'mount', (cssSelector, tag, opts) => {
        expect(cssSelector).to.eq(css);
        expect(tag).to.eq(tagName);
      });

      searchandiser.attach(tagName, css);
    });

    it('should pass options with CSS selector', () => {
      const options = { a: 'b', c: 'd' };
      sandbox.stub(riot, 'mount', (tag, cssSelector, opts) => expect(opts).to.eql(options));

      searchandiser.attach('gb-my-tag', '.gb-my.tag', options);
    });

    it('should return a single tag', () => {
      const myTag = { a: 'b', c: 'd' };
      sandbox.stub(riot, 'mount')
        .returns([myTag]);

      const tag = searchandiser.attach('gb-my-tag');
      expect(tag).to.eq(myTag);
    });

    it('should return a tag array', () => {
      const myTags = [{ a: 'b' }, { c: 'd' }];
      sandbox.stub(riot, 'mount')
        .returns(myTags);

      const tags = searchandiser.attach('gb-my-tag');
      expect(tags).to.eq(myTags);
    });
  });

  it('should call riot.compile()', (done) => {
    sandbox.stub(riot, 'compile', () => done());

    searchandiser.compile();
  });

  describe('search behaviour', () => {
    it('should perform a blank search', (done) => {
      flux.emit = (event, data) => {
        expect(event).to.eq('page_changed');
        expect(data).to.eql({ pageIndex: 0, finalPage: 0 });
        done();
      };
      flux.search = (query) => {
        expect(query).to.be.undefined;
        return { then: (cb) => cb() };
      };

      searchandiser.search();
    });

    it('should perform a search with query', () => {
      const someQuery = 'some query';
      flux.search = (query) => Promise.resolve(expect(query).to.eq(someQuery));

      searchandiser.search(someQuery);
    });
  });
});