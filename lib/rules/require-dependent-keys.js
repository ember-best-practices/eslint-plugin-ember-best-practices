/**
 * @fileOverview Disallow computed properties that do not declare dependent keys.
 */

const { get } = require('../utils/get');
const MESSAGE = 'Do not use Computed Properties without dependent keys. If you want the property to be set only once, initialize it in init(). Please see following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/require-dependent-keys.md';

function isMissingDependentKeys(node, context) {
  if (
    (
      node.arguments
      && node.arguments.length
      && node.arguments[0].type === 'FunctionExpression'
    ) || (
      node.arguments
      && node.arguments.length
      && node.arguments[0].type === 'ObjectExpression'
    )
  ) {
    context.report(node, MESSAGE);
  }
}

module.exports = {
  docs: {
    description: 'Disallow computed properties that do not declare dependent keys',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        let name = get(node, 'callee.name') || get(node, 'callee.property.name');
        if (name === 'computed') {
          isMissingDependentKeys(node, context);
        }
      }
    };
  }
};
