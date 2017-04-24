# Don't break the super chain

## Rule name: `no-broken-super-chain`

If you are overriding the `init` lifecycle hook in Ember modules like Component, Mixin, etc. it is necessary that you include a call to `_super`

```javascript
// GOOD

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.alias = this.concrete;
  });
```

```javascript
// BAD

export default Ember.Component.extend({
  init() {
    this.alias = this.concrete;
  }
});
```