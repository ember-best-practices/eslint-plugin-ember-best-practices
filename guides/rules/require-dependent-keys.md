# Require Dependent Keys

One can think of computed properties as cached accessors, that broadcast change events if consumed, and their dependent key has changed. In-general computed properties that do not mutate state, will just do the right thing. They will be on-demand, and data will flow nicely.

```
export default Ember.Component.extend({
  fullName: Ember.computed('first', 'last', function() {
    return this.get('first') + ' ' + this.get('last');
  });
});
```

However, for computed properties to work correctly they must enumerate their dependencies. If they do not enumerate their dependencies you run the risk of the CP cache being stale or eagerly computed. This rule makes sure that when you use a computed property it has dependent keys.
