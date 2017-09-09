/**
 * @fileOverview Disallow the use of global `$`.
 */
'use strict';
const { get } = require('../utils/get');
const { getEmberImportBinding } = require('../utils/imports');
const {
  isVariableAssigmentGlobalJquery,
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
    let emberJqueryVariables = [];

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
        if (isVariableAssigmentGlobalJquery(node)) {
          context.report(node, MESSAGE);
        } else {
          const varName = get(node, 'id.name');
          emberJqueryVariables.push(varName);
        }
      },

      CallExpression(node) {
        const calleeName = get(node, 'callee.name');
        if (!isDestructured(node) && isGlobalJquery(node) && !emberJqueryVariables.includes(calleeName)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
