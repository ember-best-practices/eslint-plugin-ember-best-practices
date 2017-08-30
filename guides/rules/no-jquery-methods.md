# No jQuery Methods

**TL;DR** The intent of this rule is to identify any blacklisted jQuery methods as deprecated.

Provides the ability to blacklist a set of jQuery methods for deprecation.
The eventual goal being a complete removal of jQuery.

# Usage

Pass an argument array containing the specific blacklisted jQuery methods your consuming application is flagging for.

```js
const BLACKLIST = [
  'add',
  'addBack',
  'after',
  'ajaxComplete'
];

rules: {
  'ember-best-practices/no-jquery-methods': ['error', BLACKLIST]
}
```
To help generate this blacklist array, you can run this snippet in the console of your app:
```js
// In the dev tools console of your app.
let $methods = [...new Set(Object.keys($).concat(Object.keys($.fn)))];
copy(`'${$methods.join('\',\r\n\'')}'`)
```
