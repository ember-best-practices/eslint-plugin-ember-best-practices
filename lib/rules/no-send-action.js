/**
 * @fileOverview Disallow use of sendAction
 */
'use strict';

const { get } = require('../utils/get');

function isSendActionFnCall(node) {
  return get(node, 'callee.property.name') === 'sendAction';
}

const MESSAGE = 'Do not use send action. Consider using closure actions to work with JS functions instead of relying on the old action system. Please see following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-send-action.md';

module.exports = {
  docs: {
    description: 'Disallow use of sendAction',
    category: 'Best Practices'
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isSendActionFnCall(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
