/**
 * @fileOverview Disallow use of computed properties that include side-effect producing calls.
 * @author Chad Hietala
 */

const { getCaller, cleanCaller } = require('../utils/caller');
const isCPGetter = require('../utils/computed-property');
const { getEmberImportBinding, collectImportBindings } = require('../utils/imports');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

let SIDE_EFFECTS = ['this.send', 'this.sendAction', 'this.sendEvent', 'Em.sendEvent', 'Ember.sendEvent', 'this.trigger', 'this.set', 'Ember.set', 'Em.set', 'this.setProperties', 'Ember.setProperties', 'Em.setProperties'];

const MESSAGE = 'Do not send events or actions in Computed Properties. This will cause data flow issues in the application, where the accessing of a property causes some side-effect. You should only send actions on behalf of user initiated events. Please see the following guide for more infromation: https://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/no-side-effect-cp.md';

module.exports = {
  docs: {
    description: 'Disallow use of computed properties that include side-effect producing calls',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    let inCPGettter = false;
    let bindings = [];
    let emberImportBinding;

    return {
      ImportDeclaration(node) {
        bindings = collectImportBindings(node, {
          '@ember/object': ['set', 'setProperties'],
          '@ember/object/events': ['sendEvent']
        });
      },

      ObjectPattern(node) {
        if (emberImportBinding) {
          SIDE_EFFECTS = SIDE_EFFECTS.concat(collectObjectPatternBindings(node, {
            [emberImportBinding]: ['set', 'setProperties', 'sendEvent']
          }));
        }
      },

      ImportDefaultSpecifier(node) {
        emberImportBinding = getEmberImportBinding(node);
      },

      FunctionExpression(node) {
        if (isCPGetter(node)) {
          inCPGettter = true;
        }
      },
      'FunctionExpression:exit'(node) {
        if (isCPGetter(node)) {
          inCPGettter = false;
        }
      },

      CallExpression(node) {
        if (inCPGettter) {
          let caller = cleanCaller(getCaller(node));
          let hasSideEffect = SIDE_EFFECTS.includes(caller) || bindings.includes(caller);
          if (hasSideEffect) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
