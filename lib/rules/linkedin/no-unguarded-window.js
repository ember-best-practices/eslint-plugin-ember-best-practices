const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');
const { collectObjectPatternBindings } = require('../../utils/destructed-binding');

const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

function isWindowReference(node) {
  return get(node, 'object.name') === 'window';
}

function getEnvironmentImportBinding(node) {
  if (get(node, 'parent.source.raw').includes('ember-stdlib/utils/environment')) {
    return node.local.name;
  }
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
          const isCorrectReference = !!environmentImportBinding && destructuredBindings.includes('isBrowser');
          const isGuarded = (isCorrectReference && isBrowser(node)) || isEnvironmentBrowser(node);

          if (!isInActions(node) && !isInteractive(node) && !isGuarded) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};