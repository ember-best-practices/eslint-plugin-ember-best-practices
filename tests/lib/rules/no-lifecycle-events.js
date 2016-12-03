const rule = require('../../../lib/rules/no-lifecycle-events');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-lifecycle-events', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          didInsertElement() {
            this.$().on('focus', () => {
              alert('sss');
            });
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
          registerFocus: Ember.on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
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
        const { on } = Ember;
        export default Ember.Component({
          registerFocus: on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
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
        import { on } from '@ember/object/evented';
        export default Ember.Component({
          registerFocus: on('didInsertElement', function() {
            this.$().on('focus', () => {
              alert('sss');
            });
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
          registerFocus: function() {
            this.$().on('focus', () => {
              alert('sss');
            });
          }.on('didInsertElement')
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
