/**
 * @fileOverview Disallow the use of specific jQuery methods.
 */
'use strict';

const { get, getParent } = require('../utils/get');
const { isJQueryCallee, isVariableAssigmentJquery } = require('../utils/jquery');

function getMessage(blackListName) {
  return `The use of jQuery's ${blackListName} method has been deprecated.`;
}

function getLocalImportName(node, sourceName) {
  if (get(node, 'source.value').includes(sourceName)) {
    return get(node, 'specifiers').map((specifier) => specifier.local.name);
  }

  return [];
}

module.exports = {
  docs: {
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: getMessage
  },
  create(context) {
    const BLACKLIST = context.options[0] || [];
    let funcScopeJqueryVariables = [];
    let moduleScopeJqueryVariables = [];

    return {

      ImportDeclaration(node) {
        let localName = getLocalImportName(node, 'jquery');
        if (localName.length > 0) {
          moduleScopeJqueryVariables.push(localName[0]);
        }
      },

      VariableDeclarator(node) {
        if (isVariableAssigmentJquery(node)) {
          const varName = get(node, 'id.name');
          const isFuncScope = !!getParent(node, (parent) => parent.type === 'FunctionDeclaration'); // Determine if variable is in function scope or global scope.

          if (isFuncScope) {
            funcScopeJqueryVariables.push(varName);
          } else {
            moduleScopeJqueryVariables.push(varName);
          }
        }
      },

      CallExpression(node) {
        const calleeName = get(node, 'callee.property.name');
        const parentCalleeName = get(node, 'callee.object.property.name');
        if (BLACKLIST.includes(calleeName) && (parentCalleeName === '$' || isJQueryCallee(node, moduleScopeJqueryVariables, funcScopeJqueryVariables))) {
          context.report({ node: node.callee.property, message: getMessage(`${parentCalleeName}.${calleeName}()`) });
        }
      },

      MemberExpression(node) {
        let propertyName = get(node, 'property.name');
        // If the node doesn't have a name, return early.
        if (!propertyName) {
          return;
        }
        let blackListName = BLACKLIST.includes(propertyName) ? propertyName : false;
        let isThisExpression = get(node, 'object.type').includes('ThisExpression');

        if (!isThisExpression && blackListName && isJQueryCallee(node, moduleScopeJqueryVariables, funcScopeJqueryVariables)) {
          context.report({ node: node.property, message: getMessage(blackListName) });
        }
      },

      FunctionDeclaration() {
        // Reset the function scope variables for each function declaration.
        funcScopeJqueryVariables.length = 0;
      }
    };
  }
};
