const { isGuarded } = require('../utils/fast-boot');
const { get } = require('../utils/get');

const MESSAGE = 'Do not use unguarded document references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-document.md';

function isDocumentReference(node) {
  return get(node, 'callee.object.name') === 'document';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isDocumentReference(node) && !isGuarded(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
