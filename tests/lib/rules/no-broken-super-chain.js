const rule = require('../../../lib/rules/no-broken-super-chain');
const RuleTester = require('eslint').RuleTester;

const { noSuper, tooManySupers, argsNotPassedToSuper } = rule.meta.messages;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-broken-super-chain', rule, {
  valid: [
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
          },
          somethingNotInit() {
            this.alias = this.concrete;
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super.apply(this, arguments);
            this.alias = this.concrete;
          },
        });`
    },
    {
      code: `
        export default Ember.Route.extend({
          init() {
            this._super(...arguments);
            this.get('foo');
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            function foo () {
              return true;
            }
            this._super(...arguments);
            this.alias = this.concrete;
          },
          somethingNotInit() {
            this.alias = this.concrete;
          }
        });`
    },
    {
      code: `
        export default MyComponent.extend({
          didInsertElement() {
            this._super(...arguments);
            this.updateBlurHandler(true);
          }
        });`
    },
    {
      code: `
        const foo = Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
          }
        });

        export default foo;`
    },
    {
      code: `
        export default Ember.Component.extend(SomeMixin, {
          init() {
            this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didReceiveAttrs() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          willRender() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didInsertElement() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didRender() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didUpdateAttrs() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          willUpdate() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didUpdate() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          willDestroy() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          willDestroyElement() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          willClearRender() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didDestroyElement() {
            return this._super(...arguments);
          }
        });`
    },
    {
      code: `
        export default Foo.extend({ [lol]: function() {}});`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Service.extend({
          init() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: `${noSuper} init`
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: `${noSuper} init`
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          destroy() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: `${noSuper} destroy`
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          willDestroy() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: `${noSuper} willDestroy`
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          willDestroyElement() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: `${noSuper} willDestroyElement`
      }]
    },
    {
      code: `
        export default Ember.Route.extend({
          init() {
            this.get('foo');
          }
        });`,
      errors: [{
        message: `${noSuper} init`
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super(); // missing '...arguments'
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: argsNotPassedToSuper
      }]
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
            this._super(...arguments);
          }
        });`,
      errors: [{
        message: tooManySupers
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didReceiveAttrs() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didReceiveAttrs`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          willRender() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} willRender`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didInsertElement() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didInsertElement`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didRender() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didRender`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didUpdateAttrs() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didUpdateAttrs`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          willUpdate() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} willUpdate`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didUpdate() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didUpdate`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          willClearRender() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} willClearRender`
      }]
    },
    {
      code: `
        export default MyComponent.extend({
          didDestroyElement() {
            this.someMethod();
          }
        });`,
      errors: [{
        message: `${noSuper} didDestroyElement`
      }]
    }
  ]
});
