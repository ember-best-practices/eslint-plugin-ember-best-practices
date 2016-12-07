const { getParent } = require('../utils/get');
const { isEnvironmentBrowser } = require('../utils/fast-boot');

const TIMERS = ['setTimeout', 'setInterval'];

const MESSAGE = 'Do not use timers. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-timers.md';

function isTimer(name) {
  return TIMERS.includes(name);
}

function isInAction(node) {
  return !!getParent(node, (node) => node.type === 'Property' && node.key.name === 'actions');
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

        if (name && isTimer(name) && !isInAction(node) && !isEnvironmentBrowser(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
