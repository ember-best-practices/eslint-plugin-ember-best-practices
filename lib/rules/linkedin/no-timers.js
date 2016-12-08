/**
 * @fileOverview Disallow use of unguarded timers, which can result in issues within the BPR.
 * @author Steve Calvert
 */

const { isInActions, isInteractive } = require('../../utils/interactive');
const { isBrowser, isEnvironmentBrowser } = require('../../utils/linkedin/bpr');

const TIMERS = ['setTimeout', 'setInterval'];

const MESSAGE = 'Do not use timers. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/linkedin/no-timers.md';

function isTimer(name) {
  return TIMERS.includes(name);
}

function getName(node) {
  if (!node.callee) {
    return '';
  }

  return node.callee && (node.callee.name || (node.callee.property && node.callee.property.name));
}

module.exports = {
  docs: {
    description: 'Disallow use of unguarded timers, which can result in issues within the BPR',
    category: 'Best Practices',
    recommended: false
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        let name = getName(node);

        if (name && isTimer(name)) {
          if (!isInActions(node) && !isInteractive(node) && !isBrowser(node) && !isEnvironmentBrowser(node)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
