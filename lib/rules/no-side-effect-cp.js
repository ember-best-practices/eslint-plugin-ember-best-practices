const { getCaller, cleanCaller } = require('../utils/caller');
const isCPGetter = require('../utils/computed-property');
const collectImportBindings = require('../utils/imports');

const SIDE_EFFECTS = ['this.send', 'this.sendAction', 'this.sendEvent', 'Em.sendEvent', 'Ember.sendEvent', 'this.trigger', 'this.set', 'Ember.set', 'Em.set', 'this.setProperties', 'Ember.setProperties', 'Em.setProperties'];

const MESSAGE = 'Do not send events or actions in Computed Properties. This will cause data flow issues in the application, where the accessing of a property causes some side-effect. You should only send actions on behalf of user initiated events. Please see the following guide for more infromation: https://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/no-action-cp.md';

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    let inCPGettter = false;
    let bindings;

    return {
      ImportDeclaration(node) {
        bindings = collectImportBindings(node, {
          '@ember/object': ['set', 'setProperties'],
          '@ember/object/events': ['sendEvent']
        });
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
