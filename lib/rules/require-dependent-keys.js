/**
 * @fileOverview Disallow computed properties that do not declare dependent keys.
 */

const { get } = require('../utils/get');
const MESSAGE = 'Do not use Computed Properties without dependent keys. If you want the property to be set only once, initialize it in init(). Please see following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/require-dependent-keys.md';

function isMissingDependentKeys(name, node, context) {
  if (name === 'computed' && node.arguments.length === 1) {
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
        isMissingDependentKeys(name, node, context);
      }
    };
  }
};
