# No Attrs

**TL;DR** Use `_` to prefix things that are local and leave passed items as the bare name.

In the runup to Ember 2.0, several blog articles were written about using `this.attrs` but this feature has never been documented as a public API. Typically people use `attrs` to denote properties and methods as having been "passed" in to a component and bare names as properties local to the component. This is useful and some iteration of Ember will have this built into the programming model, but for now we should not use `attrs`.

In JavaScript we typically prefix "private" things with `_`. If you want to create this notion in a component, we can leverage this long standing convention. Things that are local are technically private as a component's scope is isolated so marking them with `_` makes sense semantically. Passed items can use the bare name, as they are effectively public/protected methods and properties.
