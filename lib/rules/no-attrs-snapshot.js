/**
 * @fileOverview Disallow use of attrs snapshot in `didReceiveAttrs` and `didUpdateAttrs`.
 * @author Chad Hietala
 */
'use strict';

const { get } = require('../utils/get');

/**
 * Determines if `didReceiveAttrs` or `didUpdateAttrs` are recieving parameters. If so,
 * this indicates the `attrs` snapshots are being used within those methods.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if either `didReceiveAttrs` or `didUpdateAttrs` are utilizing
 *                    a parameter containing `attrs`, otherwise false.
 */
function hasAttrsSnapShot(node) {
  let methodName = get(node, 'parent.key.name');
  let hasParams = node.params.length > 0;
  return (methodName === 'didReceiveAttrs' || methodName === 'didUpdateAttrs') && hasParams;
}

const MESSAGE = 'Do not use the attrs snapshot that is passed in `didReceiveAttrs` and `didUpdateAttrs`. Please see the following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-attrs-snapshot.md';

module.exports = {
  docs: {
    description: 'Disallow use of attrs snapshot in `didReceiveAttrs` and `didUpdateAttrs`',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    return {
      FunctionExpression(node) {
        if (hasAttrsSnapShot(node)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
