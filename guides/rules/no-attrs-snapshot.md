# No `attrs` snapshots

In 2.0.0, [`didReceiveAttrs`](https://guides.emberjs.com/v2.9.0/components/the-component-lifecycle/#toc_formatting-component-attributes-with-code-didreceiveattrs-code) and [`didUpdateAttrs`](https://guides.emberjs.com/v2.9.0/components/the-component-lifecycle/#toc_resetting-presentation-state-on-attribute-change-with-code-didupdateattrs-code) hooks were introduced. These hooks are called whenever the arguments to a component referentially change. These hooks receive params, however one should not use them as they force those objects to reify which can be very costly when you have a lot of components on the page. These arguments are also purposely undocumented. If for some reason you need to do a comparison of arguments we suggest that you simply keep a cache on the component.

```
// Good
export default Ember.Component({
  init() {
    this._super(...arguments);
    this._valueCache = this.value;
    this.updated = false;
  },
  didReceiveAttrs() {
    if (this._valueCache !== this.value) {
      this._valueCache = this.value;
      this.set('updated', true);
    } else {
      this.set('updated', false);
    }
  }
});

// Bad
export default Ember.Component({
  init() {
    this._super(...arguments);
    this.updated = false;
  },
  didReceiveAttrs(attrs) {
    let { newAttrs, oldAttrs } = attrs;
    if ((newAttrs && oldAttrs) && newAttrs.value !== oldAttrs.value) {
      this.set('updated', true);
    } else {
      this.set('updated', false);
    }
  }
});
```
