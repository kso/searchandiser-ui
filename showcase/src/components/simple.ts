export abstract class SimpleComponent {
  constructor(public name: { attach: string, riot: string, display: string }) { }

  usage = {
    html: `
    <div class="${this.name.attach}"></div>
    `,
    riot: `
    <${this.name.riot}></${this.name.riot}>
    `,
    js: `
    searchandiser.attach('${this.name.attach}');

    searchandiser.attach('${this.name.attach}', '.${this.name.attach}');

    searchandiser.attach('${this.name.attach}', '.${this.name.attach}', { ...options... });
    `
  };
}
