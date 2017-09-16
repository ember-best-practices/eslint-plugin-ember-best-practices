/**
 * @fileOverview Disallow use of send
 */
'use strict';

const { getCaller, cleanCaller } = require('../utils/caller');

const SEND_CALLER = 'this.send';

const MESSAGE = 'Do not use send() to bubble actions. Consider using closure actions to work with JS functions instead of relying on the old action system. Please see following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-send.md';

module.exports = {
  docs: {
    description: 'Disallow use of send',
    category: 'Best Practices'
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        const caller = cleanCaller(getCaller(node));
        if (caller === SEND_CALLER) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
