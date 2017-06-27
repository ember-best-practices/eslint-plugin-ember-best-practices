/**
 * @fileOverview Disallow the use of global `$`.
 */
'use strict';

const { getEmberImportBinding } = require('../utils/imports');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

const MESSAGE = 'Do not use global `$` or `jQuery`.';
const ALIASES = ['$', 'jQuery'];

/**
 * Determines if this expression matches a global jQuery invocation, either `$` or `jQuery`.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if the expression matches, otherwise false.
 */
function isGlobalJquery(node) {
  return node.callee && ALIASES.includes(node.callee.name);
}

module.exports = {
  docs: {
    description: 'Disallow the use of global `$`',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    let emberImportBinding;
    let destructuredAssignment = null;

    function isDestructured(node) {
      return node && node.callee && node.callee.name === destructuredAssignment;
    }

    return {
      ImportDefaultSpecifier(node) {
        emberImportBinding = getEmberImportBinding(node);
      },

      ObjectPattern(node) {
        if (emberImportBinding) {
          destructuredAssignment = collectObjectPatternBindings(node, {
            [emberImportBinding]: ['$']
          }).pop();
        }
      },

      CallExpression(node) {
        if (!isDestructured(node) && isGlobalJquery(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
