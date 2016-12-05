const { isGuarded } = require('../utils/fast-boot');

const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

function isWindowReference(node) {
  return node.object && node.object.name && node.object.name === 'window';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isWindowReference(node) && !isGuarded(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};