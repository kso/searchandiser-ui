<gb-terminal-pager>
  <div class="gb-terminal-pager { _style }">
    <a class="gb-terminal__link first { disabled: _scope.backDisabled }" if={ _scope.terminals } onclick={ _scope.pager.first }>
      <gb-icon if={ _scope.icons } value={ first_icon }></gb-icon>
      <span if={ _scope.labels }>{ _scope.numeric ? 1 : first_label }</span>
    </a>
    <yield/>
    <a class="gb-terminal__link last { disabled: _scope.forwardDisabled }" if={ _scope.terminals } onclick={ _scope.pager.last }>
      <span if={ _scope.labels }>{ _scope.numeric ? _scope.lastPage : last_label }</span>
      <gb-icon if={ _scope.icons } value={ last_icon }></gb-icon>
    </a>
  </div>

  <script>
    import '../icon/gb-icon.tag';
    import { TerminalPager } from './gb-terminal-pager';
    this._mixin(TerminalPager);
  </script>

  <style scoped>
    .gb-stylish a {
      cursor: pointer;
    }

    .gb-stylish.gb-terminal-pager {
      display: flex;
      width: 100%;
    }

    .gb-stylish .gb-terminal__link {
      display: flex;
      text-decoration: none;
      color: #888;
      padding: 5px 14px;
    }

    .gb-stylish .gb-terminal__link:hover {
      color: black;
    }

    .gb-stylish .gb-terminal__link.disabled {
      color: #ddd;
      cursor: not-allowed;
    }

    .gb-stylish gb-pager {
      flex: 1;
    }

    .gb-stylish gb-icon img {
      width: 20px;
    }
  </style>
</gb-terminal-pager>
