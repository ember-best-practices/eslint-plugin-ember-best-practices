# No Unguarded Window References (LinkedIn specific)

**TL;DR: Ensure that all window references are guarded inside an if block with the condition `environment.isBrowser()`**

Unguarded window references will break when used with FastBoot. This is due to the Node environment
not having a global `window` object. 

To protect against errors during server side rendering, you should ensure you're guarding the usages
of `window` with a check to `environment.isBrowser()`.

Example:

```js
import Ember from 'ember';
import environment from 'ember-stdlib/utils/environment';

Ember.Component.extend({
  init() {
    if (environment.isBrowser()) {
      this.location = window.location;
    }
  }
});
```
