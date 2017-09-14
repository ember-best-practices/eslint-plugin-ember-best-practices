const rule = require('../../../lib/rules/no-side-effect-cp');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

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
        });`
    },
    {
      code: `
        import EmberObject from '@ember/object';
        export default EmberObject();`
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
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
