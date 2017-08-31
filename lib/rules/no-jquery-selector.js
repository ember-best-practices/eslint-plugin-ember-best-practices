/**
 * @fileOverview Disallow the use of jQuery selector.
 */
'use strict';

const { get } = require('../utils/get');
const componentElementMessage = 'The use of this.$() to get a component\'s element is deprecated. Use \'this.element\' instead';

function getSelectorMessage(selector) {
  return `The use of $(${selector}) to select an element is deprecated.`;
}

module.exports = {
  docs: {
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    componentElementMessage,
    getSelectorMessage
  },
  create(context) {
    return {
      CallExpression(node) {
        const calleeName = get(node, 'callee.property.name');
        const problemNode = node.callee;
        const firstNodeArg = node.arguments && node.arguments[0];

        if (calleeName === '$') {
          let message;
          if (firstNodeArg) {
            // Get the arg's value if it's a string or name if it's a variable.
            const argName = firstNodeArg.value || firstNodeArg.name;
            message = getSelectorMessage(argName);
          } else {
            message = componentElementMessage;
          }
          context.report({ node: problemNode, message });
        }
      }
    };
  }
};
