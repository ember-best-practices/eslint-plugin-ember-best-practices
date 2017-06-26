/**
 * @fileOverview Disallow the use of `this.attrs`.
 */
'use strict';

/**
 * Determines if this expression matches `this.attrs`.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if the expression matches, otherwise false.
 */
function isAttrs(node) {
  return node.property.name === 'attrs' && node.object.type === 'ThisExpression';
}

const MESSAGE = 'Do not use this.attrs. Please see the following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-attrs.md';

module.exports = {
  docs: {
    description: 'Disallow the use of `this.attrs`',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isAttrs(node)) {
          context.report(node.property, MESSAGE);
        }
      }
    };
  }
};
