const { getCaller, cleanCaller } = require('../utils/caller');
const isCPGetter = require('../utils/computed-property');

const SENDERS = ['send', 'sendAction', 'sendEvent', 'Em.sendEvent', 'Ember.sendEvent'];

const MESSAGE = 'Do not send events or actions in Computed Properties. This will cause data flow issues in the application, where the accessing of a property causes some side-effect. You should only send actions on behalf of user initiated events. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-action-cp.md';

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    let inCPGettter = false;

    return {
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
          let parts = caller.split('.');
          let hasSender = parts.filter((prop) => SENDERS.indexOf(prop) > -1).length >= 1;

          if (hasSender) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
