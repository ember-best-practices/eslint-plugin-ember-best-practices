const rule = require('../../../lib/rules/require-ember-lifeline');
const getMessage = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});
const filename = 'addon/components/my-component.js';
const unlintableFilename = 'addon/utils/util.js';

ruleTester.run('require-ember-lifeline', rule, {
  valid: [
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.runTask(() => {
              doSomeWork();
            });
          }
        });`
    },
    {
      filename,
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
        });`
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.debounceTask(() => {
              doSomeWork();
            });
          }
        });`
    },
    {
      filename,
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
        });`
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            this.throttleTask(() => {
              doSomeWork();
            });
          }
        });`
    },
    {
      filename,
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
        });`
    },
    {
      filename: unlintableFilename,
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
        });`
    }
  ],
  invalid: [
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.later(() => {
              doSomeWork();
            }, 100);
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.later')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              Ember.run.later(() => {
                doSomeWork();
              }, 100);
            }
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.later')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.later(() => {
              doSomeWork();
            }, 100);
          }
        });`,
      errors: [{
        message: getMessage('run.later')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              run.later(() => {
                doSomeWork();
              }, 100);
            }
          }
        });`,
      errors: [{
        message: getMessage('run.later')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          init() {
            foo.later(() => {
              doSomeWork();
            }, 100);
          }
        });`,
      errors: [{
        message: getMessage('foo.later')
      }]
    },
    {
      filename,
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
              }, 100);
            }
          }
        });`,
      errors: [{
        message: getMessage('foo.later')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.next(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              Ember.run.next(() => {
                doSomeWork();
              });
            }
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.next(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('run.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            foo() {
              run.next(() => {
                doSomeWork();
              });
            }
          }
        });`,
      errors: [{
        message: getMessage('run.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          init() {
            foo.next(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('foo.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        const {
          run: foo
        } = Ember;

        export default Ember.Component({
          actions: {
            bar() {
              foo.next(() => {
                doSomeWork();
              });
            }
          }
        });`,
      errors: [{
        message: getMessage('foo.next')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.debounce(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.debounce')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('Ember.run.debounce')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.debounce(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('run.debounce')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('run.debounce')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('foo.debounce')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('foo.debounce')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.run.throttle(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('Ember.run.throttle')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('Ember.run.throttle')
      }]
    },
    {
      filename,
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            run.throttle(() => {
              doSomeWork();
            });
          }
        });`,
      errors: [{
        message: getMessage('run.throttle')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('run.throttle')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('foo.throttle')
      }]
    },
    {
      filename,
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
      errors: [{
        message: getMessage('foo.throttle')
      }]
    }
  ]
});
