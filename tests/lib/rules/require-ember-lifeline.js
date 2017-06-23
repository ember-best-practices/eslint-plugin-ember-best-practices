const rule = require('../../../lib/rules/require-ember-lifeline');
const getMessage = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('require-ember-lifeline', rule, {
  valid: [
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.runTask(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              this.runTask(() => {
                doSomeWork();
              });
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
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.debounceTask(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              this.debounceTask(() => {
                doSomeWork();
              });
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
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.throttleTask(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              this.throttleTask(() => {
                doSomeWork();
              });
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
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.later(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.later')
      }]
    },
    {
      code: `        
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              Ember.run.later(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.later')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.later(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.later')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              run.later(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.later')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          init() {
            foo.later(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.later')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          actions: {
            bar() {
              foo.later(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.later')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.debounce(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.debounce')
      }]
    },
    {
      code: `        
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              Ember.run.debounce(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.debounce')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.debounce(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.debounce')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              run.debounce(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.debounce')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          init() {
            foo.debounce(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.debounce')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          actions: {
            bar() {
              foo.debounce(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.debounce')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.throttle(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.throttle')
      }]
    },
    {
      code: `        
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              Ember.run.throttle(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('Ember.run.throttle')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.throttle(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.throttle')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              run.throttle(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('run.throttle')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          init() {
            foo.throttle(() => {
              doSomeWork();
            });
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.throttle')
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          actions: {
            bar() {
              foo.throttle(() => {
                doSomeWork();
              });
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: getMessage('foo.throttle')
      }]
    }
  ]
});
