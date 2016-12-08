/**
 * @fileOverview Disallow the use of unguarded document references.
 * @author Steve Calvert
 */
'use strict';

const { get } = require('../../utils/get');
const { isBrowser, isEnvironmentBrowser, getEnvironmentImportBinding } = require('../../utils/linkedin/bpr');
const { isInActions, isInteractive } = require('../../utils/interactive');
const { collectObjectPatternBindings } = require('../../utils/destructed-binding');

const MESSAGE = 'Do not use unguarded document references. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-unguarded-document.md';

/**
 * Determines if the current node is a document reference.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if a document reference is found, else false.
 */
function isDocumentReference(node) {
  return get(node, 'callee.object.name') === 'document';
}

module.exports = {
  docs: {
    description: 'Disallow the use of unguarded document references',
    category: 'Best Practices',
    recommended: false
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    let environmentImportBinding;
    let destructuredBindings = [];

    return {
      ObjectPattern(node) {
        if (environmentImportBinding) {
          destructuredBindings = destructuredBindings.concat(collectObjectPatternBindings(node, {
            [environmentImportBinding]: ['isBrowser']
          }));
        }
      },

      ImportDefaultSpecifier(node) {
        environmentImportBinding = getEnvironmentImportBinding(node);
      },

      CallExpression(node) {
        if (isDocumentReference(node)) {
          if (!isInActions(node) && !isInteractive(node) && !isBrowser(node) && !isEnvironmentBrowser(node)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
