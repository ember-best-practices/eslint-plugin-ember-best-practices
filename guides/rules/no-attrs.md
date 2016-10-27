# No Attrs

**TL;DR** Use `_` to prefix things that are local and leave passed items as the bare name.

In the runup to Ember 2.0, several blog articles were written about using `this.attrs` but they have never been documented as a public API. Typically people use attrs to denote things as "passed" and bare names as local. This is useful and some iteration of Ember will have this built into the programming model, but for now we should not use `attrs`.

In JavaScript we typically prefix "private" things in JavaScript with `_`. If you want to create this notion in a component, we can leverage this long standing convention. Things that are local are technically private as component's scope is isolated so marking them with `_` semantically makes sense. Passed items can use the bare name, as they are effectively public/protected methods and properties.
