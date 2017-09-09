/**
 * @fileOverview Disallow the use of specific jQuery methods.
 */
'use strict';

const { get } = require('../utils/get');
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
    let jQueryLocalName = null;

    return {

      ImportDeclaration(node) {
        let localName = getLocalImportName(node, 'jquery');
        if (localName.length > 0) {
          jQueryLocalName = localName[0];
        }
      },

      VariableDeclarator(node) {
        const varName = get(node, 'id.name');
        jQueryLocalName = isVariableAssigmentJquery(node) ? varName : null;
      },

      CallExpression(node) {
        const calleeName = get(node, 'callee.property.name');
        const parentCalleeName = get(node, 'callee.object.property.name');
        if (BLACKLIST.includes(calleeName) && (parentCalleeName === '$' || isJQueryCallee(node, jQueryLocalName))) {
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

        if (!isThisExpression && blackListName && isJQueryCallee(node, jQueryLocalName)) {
          context.report({ node: node.property, message: getMessage(blackListName) });
        }
      }
    };
  }
};
