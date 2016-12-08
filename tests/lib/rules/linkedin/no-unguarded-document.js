const rule = require('../../../../lib/rules/linkedin/no-unguarded-document');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-unguarded-document', rule, {
  valid: [
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          actions: {
            guarded() {
              if (environment.isBrowser()) {
                const node = document.querySelector('blah');
              }
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
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          actions: {
            guarded() {
              const node = document.querySelector('blah');
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
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          willRender() {
            const node = document.querySelector('blah');
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          didRender() {
            const node = document.querySelector('blah');
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          willInsertElement() {
            const node = document.querySelector('blah');
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          didInsertElement() {
            const node = document.querySelector('blah');
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          guarded() {
            if (environment.isBrowser()) {
                const node = document.querySelector('blah');
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
        import environment from 'ember-stdlib/utils/environment';

        let { isBrowser } = environment;

        export default Ember.Component.extend({
          guarded() {
            if (isBrowser()) {
              const node = document.querySelector('blah');
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
        import environment from 'ember-stdlib/utils/environment';
        const { isBrowser } = environment 

        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            if (isBrowser()) {
              const node = document.querySelector('blah');
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
        let troll = {
          isBrowser() { return 'under bridge' }
        }

        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            if (troll.isBrowser()) {
              let attackUnsuspectingLoser = true;
            }
          }
        })`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          didUpdateAttrs() {
            const node = document.querySelector('blah');
          }
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
          unguarded() {
            const node = document.querySelector('blah');
          }
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
        import Ember from 'ember';
        let troll = {
          isBrowser() { return 'under bridge' }
        }

        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            if (troll.isBrowser()) {
              const node = document.querySelector('blah');
            }
          }
        })`,
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
