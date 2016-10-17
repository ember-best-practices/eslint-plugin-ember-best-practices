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

## Installation

* `git clone <repository-url>` this repository
* `cd ember-strict-mode`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
