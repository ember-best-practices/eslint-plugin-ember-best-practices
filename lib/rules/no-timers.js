function isTimer(name) {
  return name === 'setTimeout' || name === 'setInterval';
}

const MESSAGE = '';

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      CallExpression(node) {
        let name = node.callee.name || node.callee.property.name;
        if (isTimer(name)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
