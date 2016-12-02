# Ember-strict-mode

This adds more guard rails for Ember. Just because something "works" does not mean it is correct or in line with the framework's programming model. These footguns include:

- Not adhereing to Data Down Actions Up
- Side-efffect programming
- Usage of Mixins
- Usage of Sub-Classes
- Eager/Lazy injections
- Warnings and deprecations are failing tests

# Why
As we've scaled out to over hundreds developers and hundrends of lines of code it has become clear that more "development time" guidance is required. While the guides do a good job about getting started, it's good to have some friction to make sure the app code is aligned with how Ember works.

## Using the plugin with Ember CLI

### Installation

Install the plugin as a dev dependency in your Ember CLI project.

```
npm install --save-dev eslint-plugin-ember-suave
```

This will make the plugin available to ESLint.

Next, install the [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint) addon so that your app can be linted during development and testing. This will also uninstall [ember-cli-jshint](https://github.com/ember-cli/ember-cli-jshint) since there is no need to have both linters running at the same time.

```
ember install ember-cli-eslint
```

### Configuration

The `ember-cli-eslint` addon blueprint generates a .eslintrc.js configuration file at the root of the project.

Add the plugin's [recommended](https://github.com/chadhietala/eslint-plugin-ember-best-practices/blob/master/config/recommended.js) configuration to the list of extensions:

```
// .eslintrc.js

module.exports = {
  // ...
  extends: [
    'eslint:recommended',
    'plugin:ember-best-practices/recommended'
  ],
  rules: {
  }
};
```
