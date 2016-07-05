searchandiser({
  customerId: 'golfsmith',
  // pageSize: 12,
  pageSizes: [10, 25, 50],

  structure: {
  title: 'title',
  image: 'Image_URL',
  price: 'Regular_Price'
  },
  sayt: {
  products: 12,
  queries: 8,
  // autoSearch: false,
  // highlight: false,
  categoryField: 'QtopRatedType',
  navigationNames: {
  brand: 'Brand'
  },
  allowedNavigations: ['brand']
  },
  stylish: true
});