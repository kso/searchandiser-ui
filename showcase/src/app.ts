import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Searchandiser UI Showcase';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
      { route: 'sort', name: 'sort', moduleId: './components/sort', nav: true, title: 'Sort' },
      { route: 'page-sort', name: 'page-size', moduleId: './components/page-size', nav: true, title: 'Page Size' },
      { route: 'paging', name: 'paging', moduleId: './components/paging', nav: true, title: 'Paging' },
      { route: 'record-count', name: 'record-count', moduleId: './components/record-count', nav: true, title: 'Record Count' },
      { route: 'query', name: 'query', moduleId: './components/query', nav: true, title: 'Query' },
      { route: 'raw-query', name: 'raw-query', moduleId: './components/raw-query', nav: true, title: 'Raw Query' },
      { route: 'details', name: 'details', moduleId: './components/details', nav: true, title: 'Details' },
      { route: 'raw-results', name: 'raw-results', moduleId: './components/raw-results', nav: true, title: 'Raw Results' },
      { route: 'results', name: 'results', moduleId: './components/results', nav: true, title: 'Results' },
      { route: 'related-searches', name: 'related-searches', moduleId: './components/related-searches', nav: true, title: 'Related Searches' },
      { route: 'breadcrumbs', name: 'breadcrumbs', moduleId: './components/breadcrumbs', nav: true, title: 'Breadcrumbs' },
      { route: 'did-you-mean', name: 'did-you-mean', moduleId: './components/did-you-mean', nav: true, title: 'Did You Mean' },
    ]);

    this.router = router;
  }
}
