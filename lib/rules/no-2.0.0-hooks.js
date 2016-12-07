// TODO
// Write docs for this once we feel it should be recommended.
const MESSAGE = 'Do not use the 2.0.0 hooks as they are not conducive to the programming model.';
const MISTAKE_HOOKS = ['didInitAttrs', 'didReceiveAttrs', 'didUpdateAttrs', 'didRender', 'willUpdate', 'didUpdate', 'willRender'];

module.exports = {
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      ObjectExpression(node) {
        node.properties.forEach((property) => {
          let name = property.key.name;
          if (MISTAKE_HOOKS.indexOf(name) > -1) {
            context.report(property, MESSAGE);
          }
        });
      }
    };
  }
};
