const rule = require('../../../lib/rules/no-side-effect-cp');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-side-efffect-cp', rule, {
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
    },
    {
      code: `
        import EmberObject from '@ember/object';
        export default EmberObject();`,
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
    },
    {
      code: `
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            this.set('baz', 'wat');
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
            Ember.set('baz', 'wat');
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
            Em.set('baz', 'wat');
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
      import { set } from '@ember/object';
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            set('baz', 'wat');
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
      import { set as ChadsSettingMcSetter } from '@ember/object';
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            ChadsSettingMcSetter('baz', 'wat');
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
      import { setProperties } from '@ember/object';
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            setProperties({ baz: 'wat' });
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
      import { setProperties as SetAllTheThings } from '@ember/object';
        export default Ember.Component({
          foo: 'bar',
          baz: false,
          bar: Ember.computed('foo', function() {
            SetAllTheThings({ baz: 'wat' });
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
            this.setProperties({ baz: 'wat' });
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
            this.trigger('suchTrigger');
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
