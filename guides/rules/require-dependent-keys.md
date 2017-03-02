# Require Dependent Keys

You can think of computed properties as cached accessors.
They broadcast change events if consumed and their dependent keys have changed.

```javascript
export default Ember.Component.extend({
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  });
});
```

However, for computed properties to work correctly you must enumerate the properties they depend on.
If you do not, you run the risk of the Computed Property cache being stale or eagerly computed.
This rule makes sure that when you use a computed property you list its dependent keys.

A computed property without dependent keys is only initilized once. If that is the desired behavior, you should instead initialize the property in `init()`.
