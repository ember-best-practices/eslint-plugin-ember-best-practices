# No Lifecycle Events

Ember tracks changes and notifies listeners of those changes. This is quite powerful, and prevents “glue” code to propagate changes. This also enables granular updates, rather than whole-world rebuild scenarios. This comes at a downside, we can easily accidentally (today) trigger these “update” code-paths, when they are not required. This comes largely at a performance cost. For example, if during initial render we are actually also re-rendering. This is wasteful. Ember keeps getting better at detecting these cases and informing the developer. Unfortunately it is not perfect yet. When we use the lifecycle events we are incuring double work as we must event and also call the method hooks on the object. Because of this we should simply do the work in a [lifecycle hook](https://guides.emberjs.com/v2.10.0/components/the-component-lifecycle/).

```
// Good
export default Ember.Component.extend({
  init() { // good example
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
