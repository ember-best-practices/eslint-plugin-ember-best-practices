const { isInActions, isInteractive } = require('../utils/interactive');
const { isEnvironmentBrowser } = require('../utils/linkedin/bpr');

const TIMERS = ['setTimeout', 'setInterval'];

const MESSAGE = 'Do not use timers. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-timers.md';

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
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        let name = getName(node);

        if (name && isTimer(name) && !isInActions(node) && !isInteractive(node) && !isEnvironmentBrowser(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
