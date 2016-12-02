function isAttrs(node) {
  return node.property.name === 'attrs' && node.object.type === 'ThisExpression';
}

const MESSAGE = 'Do not use this.attrs. Please see the following guide for more infromation: https://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/no-attrs.md';

module.exports = {
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
