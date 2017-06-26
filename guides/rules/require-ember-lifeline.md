# Require Ember Lifeline

[Ember lifeline](https://github.com/rwjblue/ember-lifeline)

Ember applications have long life-cycles. A user may navigate to several pages and use many different features before they leave the application. This makes JavaScript and Ember development unlike Rails development, where the lifecycle of a request is short and the environment disposed of after each request. It makes Ember development much more like iOS or video game development than traditional server-side web development.

It is good to note that this isn't something inherent to just Ember. Any single-page app framework or solution (Angular, React, Vue, Backbone...) must deal with the lifecycles of objects, and specifically with how async tasks can be bounded by a lifecycle.

Ember lifeline introduces several utility methods to help manage async, object lifecycles, and the Ember runloop. Please review the documentation to understand the APIs that can be used to replace the equivalent `Ember.run` method.