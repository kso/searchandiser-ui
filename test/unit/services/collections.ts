import { Collections, COLLECTIONS_UPDATED_EVENT } from '../../../src/services/collections';
import { expectSubscriptions } from '../../utils/expectations';
import { expect } from 'chai';
import { Events, Request } from 'groupby-api';

describe('collections service', () => {
  let sandbox: Sinon.SinonSandbox;
  let service: Collections;

  beforeEach(() => {
    service = new Collections(<any>{}, <any>{});
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => sandbox.restore());

  describe('on construction', () => {
    it('should set properties', () => {
      expect(service.collectionsConfig).to.eql({});
      expect(service.fetchCounts).to.be.true;
      expect(service.isLabeled).to.be.false;
      expect(service.collections).to.eql([]);
      expect(service.options).to.eql([]);
    });

    it('should take overrides for properties', () => {
      const options = [{ value: 'b' }];
      const collections = { collections: 'my collection', counts: false, options };
      const config: any = { tags: { collections } };

      service = new Collections(<any>{}, config);

      expect(service.collectionsConfig).to.eq(collections);
      expect(service.fetchCounts).to.be.false;
      expect(service.isLabeled).to.be.true;
      expect(service.collections).to.eql(['b']);
      expect(service.options).to.eq(options);
    });
  });

  describe('init()', () => {
    it('should update itself', (done) => {
      service = new Collections(<any>{ on: () => null }, <any>{});
      service.updateCollectionCounts = () => done();

      service.init();
    });

    it('should listen events', () => {
      const flux: any = {};
      service = new Collections(flux, <any>{});

      expectSubscriptions(() => service.init(), {
        [Events.QUERY_CHANGED]: null,
        [Events.RESULTS]: null
      }, flux);
    });
  });

  describe('updateCollectionCounts()', () => {
    it('should update collection counts', (done) => {
      const collections = ['a', 'b', 'c'];
      const counts = { a: 10, b: 30, c: 50 };
      const emit = sinon.spy((event, newCounts) => {
        expect(event).to.eq(COLLECTIONS_UPDATED_EVENT);
        expect(newCounts).to.eql(counts);
        expect(service.inProgress).to.be.an.instanceof(Promise);
        done();
      });
      const flux: any = {
        emit,
        query: { raw: { pageSize: 50, fields: ['brand', 'size'] } },
        bridge: {
          search: (request: Request) => {
            expect(request.collection).to.be.oneOf(collections);
            expect(request.pageSize).to.eq(0);
            expect(request.fields).to.eq('');
            expect(request.refinements).to.eql([]);
            return Promise.resolve({ totalRecordCount: counts[request.collection] });
          }
        }
      };
      service = new Collections(flux, <any>{});
      service.collections = collections;
      service.extractCounts = (res) => {
        expect(res).to.have.deep.members([
          { results: { totalRecordCount: counts.a }, collection: 'a' },
          { results: { totalRecordCount: counts.b }, collection: 'b' },
          { results: { totalRecordCount: counts.c }, collection: 'c' }
        ]);
        return counts;
      };

      service.updateCollectionCounts();
    });

    it('should not update collection counts if fetchCounts is false', () => {
      const flux: any = { bridge: { search: () => expect.fail() } };
      service = new Collections(flux, <any>{});
      service.collections = ['a', 'b', 'c'];
      service.fetchCounts = false;

      service.updateCollectionCounts();
    });

    it('should cancel existing search', (done) => {
      const flux: any = {
        bridge: {},
        emit: () => done(),
        query: { raw: {} }
      };
      const spy =
        flux.bridge.search =
        sinon.spy(() => {
          expect(service.inProgress.cancelled).to.be.true;
          return new Promise((resolve) => setTimeout(() => resolve({}), 100));
        });
      service = new Collections(flux, <any>{});
      service.inProgress = <any>{};
      service.collections = ['a'];

      service.updateCollectionCounts();

      expect(service.inProgress).to.be.an.instanceof(Promise);
      expect(service.inProgress.cancelled).to.be.undefined;
      expect(spy.called).to.be.true;
    });

    it('should not update results if cancelled', (done) => {
      const flux: any = { bridge: {}, query: { raw: {} } };
      const spy =
        flux.bridge.search =
        sinon.spy(() => new Promise((resolve) => setTimeout(() => resolve({}), 50)));
      service = new Collections(flux, <any>{});
      const stub = sandbox.stub(service, 'extractCounts', () => {
        service.inProgress.cancelled = true;
        flux.emit = sinon.spy();
      });
      service.collections = ['a'];

      service.updateCollectionCounts();

      setTimeout(() => {
        expect(spy.called).to.be.true;
        expect(stub.called).to.be.true;
        expect(flux.emit.called).to.be.false;
        done();
      }, 100);
    });
  });

  describe('extractCounts()', () => {
    it('should reduce results with collection to count map', () => {
      const results = [
        { results: { totalRecordCount: 11 }, collection: 'a' },
        { results: { totalRecordCount: 1412 }, collection: 'b' },
        { results: { totalRecordCount: 409 }, collection: 'c' }
      ];

      const counts = service.extractCounts(results);

      expect(counts).to.eql({
        a: 11,
        b: 1412,
        c: 409
      });
    });
  });

  describe('updateSelectedCollectionCount()', () => {
    it('should update selected collection count', () => {
      const collection = 'mycollection';
      const totalRecordCount = 450;
      const emit = sinon.spy((event, counts) => {
        expect(event).to.eq(COLLECTIONS_UPDATED_EVENT);
        expect(counts).to.eql({ [collection]: totalRecordCount });
      });
      const flux: any = { emit, query: { raw: { collection } } };
      service = new Collections(flux, <any>{});

      service.updateSelectedCollectionCount(<any>{ totalRecordCount });

      expect(emit.called).to.be.true;
    });

    it('should update selected collection count with existing counts', () => {
      const collection = 'mycollection';
      const totalRecordCount = 450;
      const emit = sinon.spy((event, counts) => {
        expect(event).to.eq(COLLECTIONS_UPDATED_EVENT);
        expect(counts).to.eql({
          [collection]: totalRecordCount,
          prod: 403,
          test: 330
        });
      });
      const flux: any = { emit, query: { raw: { collection } } };
      service = new Collections(flux, <any>{});
      service.counts = { prod: 403, test: 330 };

      service.updateSelectedCollectionCount(<any>{ totalRecordCount });

      expect(emit.called).to.be.true;
    });
  });

  describe('isSelected()', () => {
    it('should determine if collection is currently selected', () => {
      const collection = 'my collection';
      const flux: any = { query: { raw: { collection } } };
      service = new Collections(flux, <any>{});

      expect(service.isSelected(collection)).to.be.true;
      expect(service.isSelected('some collection')).to.be.false;
    });
  });

  describe('selectedCollection()', () => {
    it('should return the currently configured collection', () => {
      const collection = 'my collection';
      const flux: any = { query: { raw: { collection } } };
      service = new Collections(flux, <any>{});

      expect(service.selectedCollection).to.eq(collection);
    });

    it('should default to originally configured collection', () => {
      const collection = 'other collection';
      const config: any = { collection };
      service = new Collections(<any>{}, config);

      expect(service.selectedCollection).to.eq(collection);
    });
  });
});