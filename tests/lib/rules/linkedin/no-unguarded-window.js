const rule = require('../../../../lib/rules/linkedin/no-unguarded-window');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-unguarded-window', rule, {
  valid: [
    {
      code: `
        import environment from 'ember-stdlib/utils/environment';

        export default Ember.Component.extend({
          actions: {
            guarded() {
              if (environment.isBrowser()) {
                const location = window.location;
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
                const location = window.location;
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
              const location = window.location;
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
              const location = window.location;
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
              const location = window.location;
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
              const location = window.location;
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
              const location = window.location;
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
              const location = window.location;
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
              let allTheTacos = true;
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
              let attachUnsuspectingLoser = true;
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
            const location = window.location;
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
            const location = window.location;
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
              let location = window.location;
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
