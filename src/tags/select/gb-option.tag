<gb-option>
  <a onclick={ send }>{ label }</a>

  <script>
    import { Select } from './gb-select';
    this.label = Select.optionLabel(opts.option);
    this.value = Select.optionValue(opts.option);
    this.send = () => opts.send(this);
  </script>
</gb-option>
