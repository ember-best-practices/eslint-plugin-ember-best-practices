/**
 * @fileOverview Don't use Ember 2.0.0 hooks.
 */
'use strict';

const { get } = require('../utils/get');

// TODO
// Write docs for this once we feel it should be recommended.
const MESSAGE = 'Do not use the 2.0.0 hooks as they are not conducive to the programming model.';
const MISTAKE_HOOKS = ['didInitAttrs', 'didReceiveAttrs', 'didUpdateAttrs', 'didRender', 'willUpdate', 'didUpdate', 'willRender'];

module.exports = {
  docs: {
    description: 'Don\'t use Ember 2.0.0 hooks',
    category: 'Best Practices',
    recommended: false
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      ObjectExpression(node) {
        node.properties.forEach((property) => {
          let name = get(property, 'key.name');
          if (name && MISTAKE_HOOKS.indexOf(name) > -1) {
            context.report(property, MESSAGE);
          }
        });
      }
    };
  }
};
