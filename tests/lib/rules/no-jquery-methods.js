const rule = require('../../../lib/rules/no-jquery-methods');
const RuleTester = require('eslint').RuleTester;
const getMessage = rule.meta.message;
const BLACKLISTMETHOD = 'add';
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-jquery-methods', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$().notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$().notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const myObj = {};
            myObj[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$.notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$.notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.get().add();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$().add();
          }
        });`,
      options: []
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const myVar = this[this.myProp];
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const q = this[\`\${myVar}\`];
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          myFunc() {
            const output = this.privateMethod();
            this.$elem.style.height1 = output.height;
          }
        });`,
      options: ['height']
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            $()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        export default Ember.Component({
          init() {
            jQuery[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        export default Ember.Component({
          init() {
            const _$ = jQuery;
            _$[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const myJQueryObj = this.$();
            myJQueryObj[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        import fOO from 'foo';
        export default Ember.Component({
          init() {
            jQuery[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$.add();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(`$.${BLACKLISTMETHOD}()`)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$.add();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(`$.${BLACKLISTMETHOD}()`)
      }]
    },
    {
      code: `
        import jQ from 'jquery';
        const jayQuery = Ember.$;

        jayQuery('.class').add();
        jQ('.class2').add();`,
      options: [BLACKLISTMETHOD],
      errors: [
        { message: getMessage(BLACKLISTMETHOD) },
        { message: getMessage(BLACKLISTMETHOD) }
      ]
    },
    {
      code: `
        function func1() {
          const jayQuery = Bar.foo;
          jayQuery().add();
        }

        function func2() {
          const jayQuery = Ember.$;
          jayQuery().add();
        }

        function func3() {
          const jayQuery = Obj.method;
          jayQuery().add();
        }

        function func4() {
          const jayQuery = $;
          jayQuery().add();
        }

        function func5() {
          const jayQuery = Foo.bar;
          jayQuery().add();
        }`,
      options: [BLACKLISTMETHOD],
      errors: [
        { message: getMessage(BLACKLISTMETHOD) },
        { message: getMessage(BLACKLISTMETHOD) }
      ]
    },
    {
      code: `
        import jQ from 'jquery';
        function func1() {
          const jayQuery = Ember.$;
          jayQuery().add();
        }

        jQ().add();
      `,
      options: [BLACKLISTMETHOD],
      errors: [
        { message: getMessage(BLACKLISTMETHOD) },
        { message: getMessage(BLACKLISTMETHOD) }
      ]
    }
  ]
});
