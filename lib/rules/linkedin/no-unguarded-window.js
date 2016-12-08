/**
 * @fileOverview Disallow the use of unguarded window references.
 * @author Steve Calvert
 */
'use strict';

const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser, getEnvironmentImportBinding } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');
const { collectObjectPatternBindings } = require('../../utils/destructed-binding');

const MESSAGE = 'Do not use unguarded window references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-window.md';

/**
 * Determines if the current node is a window reference.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if a window reference is found, else false.
 */
function isWindowReference(node) {
  return get(node, 'object.name') === 'window';
}

module.exports = {
  docs: {
    description: 'Disallow the use of unguarded document references',
    category: 'Best Practices',
    recommended: false
  },
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