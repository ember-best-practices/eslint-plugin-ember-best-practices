const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser, getEnvironmentImportBinding } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');
const { collectObjectPatternBindings } = require('../../utils/destructed-binding');

const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

function isWindowReference(node) {
  return get(node, 'object.name') === 'window';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    let environmentImportBinding;
    let destructuredBindings = [];

    return {
      ObjectPattern(node) {
        if (environmentImportBinding) {
          destructuredBindings = destructuredBindings.concat(collectObjectPatternBindings(node, {
            [environmentImportBinding]: ['isBrowser']
          }));
        }
      },

      ImportDefaultSpecifier(node) {
        environmentImportBinding = getEnvironmentImportBinding(node);
      },

      MemberExpression(node) {
        if (isWindowReference(node)) {
          const isEnvironmentImported = !!environmentImportBinding && destructuredBindings.includes('isBrowser');
          const isGuarded = (isEnvironmentImported && isBrowser(node)) || isEnvironmentBrowser(node);

          if (!isInActions(node) && !isInteractive(node) && !isGuarded) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};