# No jQuery Selector

**TL;DR** The intent of this rule is to identify using jQuery to select DOM elements as deprecated.

# Examples

```js
// Deprecated
export default Ember.Component({
  getElement(selector) {
    return this.$(selector);
  },

  click() {
    this.$().focus();
  }
});

// Vanilla JS
export default Ember.Component({
  getElement(selector) {
    return this.element.querySelector(selector);
  },

  click() {
    this.element.focus();
  }
});
```
