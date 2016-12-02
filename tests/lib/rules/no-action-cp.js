const rule = require('../../../lib/rules/no-action-cp');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-action-cp', rule, {
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
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            this.sendAction('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            this.send('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            this.sendEvent('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            Ember.sendEvent('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            Em.sendEvent('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import { sendEvent } from "@ember/object/events"
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            sendEvent('baz')
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
