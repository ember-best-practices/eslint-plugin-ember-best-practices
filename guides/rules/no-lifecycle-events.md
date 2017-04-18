# No Lifecycle Events

Ember tracks changes and notifies listeners of those changes. This is quite powerful and prevents the need for “glue” code to propagate changes. This also enables granular updates, rather than whole-world rebuild scenarios. This comes at a downside, we can easily trigger these “update” code-paths on accident, when they are not required. This comes largely at a performance cost. For example, if during initial render we also cause a re-render, then this is wasteful. Ember keeps getting better at detecting these cases and informing the developer. Unfortunately it is not perfect yet. When we use the lifecycle events we are incurring double work as we must event and also call the method hooks on the object. Because of this we should simply do the work in a [lifecycle hook](https://guides.emberjs.com/v2.10.0/components/the-component-lifecycle/).

```
// Good
export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('first', 'stefan');
    this.set('last', 'Penner');
  }
});
```

```
// Bad
export default Ember.Component.extend({
  setup: Ember.on('init', function() {
    this._super(...arguments);
    this.set('first', 'stefan');
    this.set('last', 'Penner');
  })
});
```
