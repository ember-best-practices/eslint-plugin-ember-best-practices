const MESSAGE = 'Do not use events for lifecycle hooks. Please use the actual hooks instead: https://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/no-lifecycle-events.md';

function isOn(node) {
  return node.name === 'on';
}

function isEmber(node) {
  return node.name === 'Ember';
}

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {

      ImportDeclaration(node) {
        if (node.source.value === '@ember/object/evented') {
          node.specifiers.forEach((specifier) => {
            if (isOn(specifier.imported)) {
              context.report(node, MESSAGE);
            }
          });
        }
      },

      FunctionExpression(node) {
        if (node.parent.property && isOn(node.parent.property)) {
          context.report(node, MESSAGE);
        }
      },

      MemberExpression(node) {
        if (isEmber(node.object) && isOn(node.property)) {
          context.report(node, MESSAGE);
        }
      },

      CallExpression(node) {
        if (isOn(node.callee)) {
          context.getScope().variables.forEach((v) => {
            if (isOn(v)) {
              v.defs.forEach((defNode) => {
                if (defNode.node.type === 'VariableDeclarator' && isEmber(defNode.node.init)) {
                  context.report(node, MESSAGE);
                }
              });
            }
          });
        }
      }
    };
  }
};
