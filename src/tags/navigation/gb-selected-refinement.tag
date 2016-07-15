<gb-selected-refinement>
  <li class="gb-ref { parentOpts.style() }">
    <a class="gb-ref__link" href="#" onclick={ remove }>&times;</a>
    <span class="gb-ref__value">{ toView(ref) }</span>
  </li>

  <script>
    const { Refinement } = require('./gb-refinement');
    this.mixin(new Refinement());
    this.remove = () => this.parentOpts.flux.unrefine(this.toRefinement(this.ref, this.nav));
  </script>

  <style scoped>
    .gb-stylish {
      position: relative;
      list-style: none;
      padding: 4px 6px;
      font-size: 14px;
    }

    .gb-stylish .gb-ref__link {
      left: -8px;
      position: absolute;
      color: black;
      text-decoration: none;
    }

    .gb-stylish .gb-ref__link:hover {
      color: red;
      font-weight: bold;
    }
  </style>
</gb-selected-refinement>
