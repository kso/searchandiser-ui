<gb-icon>
  <i if={ classes } class={ classes }></i>
  <img if={ url } src={ url }></img>

  <script>
    import { Icon } from './gb-icon';
    this._mixin(Icon);
  </script>
</gb-icon>
