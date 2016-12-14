# No Global jQuery

**TL;DR** Do not use global `$`. Use `Ember.$` instead.

In general, we want application code to reference the version of jQuery that's been directly pinned
to the version of Ember used. This helps avoid version conflicts, and ensures that code inside modules
isn't reliant on global variables.
