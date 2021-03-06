<gb-option-list>
  <ul>
    <li each={ option in _scope.options } class="gb-select__option { clear: option.clear }"
      if={ option.clear ? _scope.selectedOption : true }>
      <yield/>
    </li>
  </ul>

  <style scoped>
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul:hover {
      display: block;
    }
    a {
      cursor: pointer;
      display: block;
      text-decoration: none;
      color: black;
      padding: 10px 12px;
    }
    a:hover {
      background-color: #eee;
    }
  </style>
</gb-option-list>
