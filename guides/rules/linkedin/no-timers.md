# No Timers

**TL;DR: You should avoid using timers in favor of Ember.later**

In general, it's best to avoid the use of `setTimeout` and `setInterval` in Ember. 

From the Ember documentation:

> You should use this method whenever you need to run some action after a period of time instead of 
using setTimeout(). This method will ensure that items that expire during the same script execution 
cycle all execute together, which is often more efficient than using a real setTimeout.

While `setTimeout` maps to `Ember.run.later`, there isn't a direct equivalent of `setInterval`. You
can accomplish the rough equivalent of `setInterval` by using a recursive `setTimeout`.

Example:

```js
Ember.Component.extend({
  init() {
   this._super(...arguments);
   this.intervalToken = this.schedule(() => alert('Alert'));
   this.interval = 1000;
  }

  schedule(fn) {
    return Ember.run.later(() => {
      fn()
      this.set('intervalToken', this.schedule(fn));
    }, this.interval);
  }

  willDestroy() {
    this._super(...arguments);
    Ember.run.cancel(this.intervalToken);
  }  
});
```
