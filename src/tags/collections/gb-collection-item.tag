<gb-collection-item>
  <a class="gb-collection" data-collection={ item } onclick={ _scope.switchCollection }>
    <span class="gb-collection__name">{ _scope.labels[item] || item }</span>
    <gb-badge if={ _scope.fetchCounts }>{ _scope.counts[item] }</gb-badge>
  </a>

  <script>
    import '../badge/gb-badge.tag';
  </script>
</gb-collection-item>
