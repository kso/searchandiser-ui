export class NestedValueConverter {
  toView(value, previous) {
    return Object.assign(value, { level: previous + 1 });
  }
}
