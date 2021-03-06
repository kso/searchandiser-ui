<gb-custom-select>
  <div class="gb-select { _scope.hover ? 'hoverable' : 'clickable' } { _style }">
    <button data-is="gb-select-button" type="button"></button>
    <gb-option-list>
      <yield>
        <gb-option option={ option } send={ option.clear ? _scope.clearSelection : _scope.selectCustom }/>
      </yield>
    </gb-option-list>
  </div>

  <script>
    this._scopeTo('gb-select');
    import './gb-select-button.tag';
    import './gb-option-list.tag';
    import './gb-option.tag';
  </script>

  <style scoped>
    .gb-select {
      position: relative;
      display: inline-block;
    }
    gb-option-list {
      display: none;
      z-index: 100;
      position: absolute;
      min-width: 160px;
      background-color: #f6f6f6;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      max-height: 300px;
      overflow-y: scroll;
    }
    .gb-select.hoverable:hover gb-option-list,
    .gb-select.clickable button:focus + gb-option-list,
    gb-option-list:hover {
      display: block;
    }
    .gb-stylish.gb-select:hover button,
    .gb-stylish.gb-select button:focus {
      border-color: #aaa;
    }
    button {
      overflow-x: hidden;
      display: flex;
      align-items: center;
      font-size: 14px;
      border: none;
      cursor: pointer;
      padding: 8px 16px;
      width: 100%;
      background-color: #eee;
      border: 2px solid #ddd;
      border-radius: 4px;
      white-space: nowrap;
    }
    .gb-stylish button:focus {
      outline: none;
    }
  </style>
</gb-custom-select>
