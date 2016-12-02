const MESSAGE = 'Do not use Computed Properties without dependent keys. Please see following guide for more information: http://github.com/chadhietala/ember-best-practices/files/guides/require-dependent-keys.md';

function isMissingDependentKeys(name, node, context) {
  if (name === 'computed' && node.arguments.length === 1) {
    context.report(node, MESSAGE);
  }
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        let name = node.callee.name || node.callee.property.name;
        isMissingDependentKeys(name, node, context);
      }
    };
  }
};
