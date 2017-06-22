# Require Ember Lifeline

[Ember lifeline](https://github.com/rwjblue/ember-lifeline)

Ember applications have long life-cycles. A user may navigate to several pages and use many different features before they leave the application. This makes JavaScript and Ember development unlike Rails development, where the lifecycle of a request is short and the environment disposed of after each request. It makes Ember development much more like iOS or video game development than traditional server-side web development.

It is good to note that this isn't something inherent to just Ember. Any single-page app framework or solution (Angular, React, Vue, Backbone...) must deal this lifecycles of objects, and specifically with how async tasks can be bounded by a lifecycle.

Ember lifeline introduces several utility methods to help manage async, object lifecycles, and the Ember runloop. Of those utility methods, `runTask` can be used as a direct replacement for `Ember.run.later`, providing engineers a more robust, lifecyle aware variant for deferred operations.

Example:

```javascript
import Ember from 'ember';

const { Component, run } = Ember;

export default Component.extend({
  init() {
    this._super();
    run.later(() => {
      // First, check if this object is even valid
      if (this.isDestroying || this.isDestroyed) { return; }
      this.set('date', new Date);
    }, 500);
  }
});
```

becomes:

```javascript
import Ember from 'ember';
import RunMixin from 'ember-lifeline/mixins/run';

const { Component } = Ember;

export default Component.extend(RunMixin, {
  init() {
    this._super();
    this.runTask(() => {
      this.set('date', new Date);
    }, 500);
  }
});
```