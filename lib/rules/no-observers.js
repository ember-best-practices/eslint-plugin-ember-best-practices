/**
 * @fileOverview Disallow use of observers.
 */
'use strict';

function isObserver(node) {
  let { property, callee } = node;
  return (property && property.name === 'observer')
         || (callee && callee.name === 'observer');
}

const MESSAGE = 'Do not use observers. Consider using computed properties instead. Please see following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-observers.md';

module.exports = {
  docs: {
    description: 'Disallow use of observers',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isObserver(node)) {
          context.report(node.property, MESSAGE);
        }
      },

      CallExpression(node) {
        if (isObserver(node)) {
          context.report(node.callee, MESSAGE);
        }
      }
    };
  }
};
