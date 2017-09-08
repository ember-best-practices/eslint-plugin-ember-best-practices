const rule = require('../../../lib/rules/no-jquery-selector');
const RuleTester = require('eslint').RuleTester;
const {
  componentElementMessage,
  getSelectorMessage
} = rule.meta;
const TEST_CLASS = '.some-class';
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-jquery-selector', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$.ajax();
          }
        });`
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$.ajax();
          }
        });`
    },
    {
      code: `
        export default Ember.Component({
          myFunc() {
            return \`\${someProp}\`;
          }
        });`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$('.some-class');
          }
        });`,
      errors: [
        { message: getSelectorMessage(TEST_CLASS) }
      ]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$('.some-class');
          }
        });`,
      errors: [
        { message: getSelectorMessage(TEST_CLASS) }
      ]
    },
    {
      code: `
        export default Ember.Component({
          myFunc(selector) {
            Ember.$(selector);
          }
        });`,
      errors: [
        { message: getSelectorMessage('selector') }
      ]
    },
    {
      code: `
        export default Ember.Component({
          myFunc(selector) {
            this.$(selector);
          }
        });`,
      errors: [
        { message: getSelectorMessage('selector') }
      ]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$();
          }
        });`,
      errors: [{
        message: componentElementMessage
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$().focus();
          }
        });`,
      errors: [{
        message: componentElementMessage
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$('.some-class').focus();
          }
        });`,
      errors: [{
        message: getSelectorMessage(TEST_CLASS)
      }]
    },
    {
      code: `
        export default Ember.Component({
          myFunc() {
            const myVar = '.some-class';
            this.$(myVar);
          }
        });`,
      errors: [{
        message: getSelectorMessage('myVar')
      }]
    },
    {
      code: `
        export default Ember.Component({
          myFunc() {
            const myVar = '.some-class';
            Ember.$(myVar);
          }
        });`,
      errors: [{
        message: getSelectorMessage('myVar')
      }]
    }
  ]
});
