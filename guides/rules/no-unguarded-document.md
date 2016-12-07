# No Unguarded Document References

**TL;DR: Ensure that all document references are guarded inside an if block with the condition `environment.isBrowser()`**

Unguarded document references will break when used with FastBoot. This is due to the Node environment
not having a global `document` object. 

To protect against errors during server side rendering, you should ensure you're guarding the usages
of `document` with a check to `environment.isBrowser()`.

Example:

```js
import Ember from 'ember';

Ember.component.extend({
  init() {
    if (environment.isBrowser()) {
      this.element = document.querySelector('.my-element');
    }
  }
});
```
