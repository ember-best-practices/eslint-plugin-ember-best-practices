/**
 * @fileOverview Disallow the use of global `$`.
 */
'use strict';

const { getEmberImportBinding } = require('../utils/imports');
const {
  isJQueryCallee,
  isVariableAssigmentJquery,
  JQUERY_ALIASES
} = require('../utils/jquery');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

const MESSAGE = 'Do not use global `$` or `jQuery`.';

/**
 * Determines if this expression matches a global jQuery invocation, either `$` or `jQuery`.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if the expression matches, otherwise false.
 */
function isGlobalJquery(node) {
  return node.callee && JQUERY_ALIASES.includes(node.callee.name);
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
    let jQueryLocalName = null;

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

      VariableDeclarator(node) {
        jQueryLocalName = isVariableAssigmentJquery(node);
      },

      CallExpression(node) {
        if (jQueryLocalName && !isJQueryCallee(node, jQueryLocalName)) {
          return;
        } else if (!isDestructured(node) && isGlobalJquery(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
