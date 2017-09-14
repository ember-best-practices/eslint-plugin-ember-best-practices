const rule = require('../../../lib/rules/no-lifecycle-events');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-lifecycle-events', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          didInsertElement() {
            this.$().on('focus', () => {
              alert('sss');
            });
          },
          myCustomEvent: Ember.on('customEvent', function() {
            alert('sj08');
          })
        });`
    },
    {
      code: `
        import Ember from 'ember';
        const { on } = $;
        export default Ember.Component({
          registerFocus: on('click', function() {
            // do stuff
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          registerFocus: Ember.on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import Ember from 'ember';
        const { on } = Ember;
        export default Ember.Component({
          registerFocus: on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import { on } from '@ember/object/evented';
        export default Ember.Component({
          registerFocus: on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          registerFocus: function() {
            this.$().on('focus', () => {
              alert('sss');
            });
          }.on('didInsertElement')
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
