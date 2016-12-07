const { isBrowser, isEnvironmentBrowser } = require('../utils/fast-boot');

const EMBER_STD_LIB_IMPORT = 'ember-stdlib/utils/environment';
const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

function isWindowReference(node) {
  return node.object.name === 'window';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    let isStdLibImported = false;
    let isBrowserDeconstructed = false;

    return {
      ImportDeclaration(node) {
        if (node.source.value === EMBER_STD_LIB_IMPORT) {
          console.log('std lib imported')
          isStdLibImported = true;
        }
      },

      CallExpression(node) {
        context.getScope().variables.forEach((v) => {
          if (v.name === 'isBrowser') {
            v.defs.forEach((defNode) => {
              if (defNode.node.type === 'VariableDeclarator' && defNode.node.init.name === 'environment') {
                console.log('isBrowser deconstructed')
                isBrowserDeconstructed = true;
              }
            });
          }
        });
      },

      MemberExpression(node) {
        if (isWindowReference(node)) {
          if (!isBrowser(node) || !isEnvironmentBrowser(node)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};