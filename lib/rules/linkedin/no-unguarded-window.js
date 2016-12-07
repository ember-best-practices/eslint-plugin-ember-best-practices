const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');

const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

function isWindowReference(node) {
  return get(node, 'object.name') === 'window';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isWindowReference(node)) {
          if (!isInActions(node) && !isInteractive(node) && !isBrowser(node) && !isEnvironmentBrowser(node)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};