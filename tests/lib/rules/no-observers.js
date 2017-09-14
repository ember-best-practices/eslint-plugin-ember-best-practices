const rule = require('../../../lib/rules/no-observers');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-observers', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          actions: {
            userInput() {
              this.set('baz', true);
            }
          }
        });`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          fooChanged: Ember.observer('foo', function() {
            this.set('baz', true);
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const { observer } = Ember;
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          fooChanged: observer('foo', function() {
            this.set('baz', true);
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import { observer } from "@ember/object";
        import { Component } from "@ember/component";
        export default Component.extend({
          foo: 'bar',
          baz: false,
          fooChanged: observer('foo', function() {
            this.set('baz', true);
          })
        })`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
