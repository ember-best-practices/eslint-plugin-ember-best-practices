const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');

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
        if (isDocumentReference(node)) {
          if (!isInActions(node) && !isInteractive(node) && !isBrowser(node) && !isEnvironmentBrowser(node)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
