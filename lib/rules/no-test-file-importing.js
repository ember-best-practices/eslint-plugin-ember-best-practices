/**
 * @fileOverview no importing of test files are allowed
 */

'use strict';

const REPORT_MESSAGE
  = 'Do not import "-test.js" file in a test file. This will cause the module and tests from the imported file to be executed again.';

/**
 * Returns the name of the module imported or re-exported.
 *
 * @param {ASTNode} node - A node to get.
 * @returns {string} the name of the module, or empty string if no name.
 */
function getValue(node) {
  if (node && node.source && node.source.value) {
    return node.source.value.trim();
  }

  return '';
}

/**
 * Checks if the name of the import has '-test' in it, and reports if so.
 *
 * @param {ASTNode} importDeclaration - The importDeclaration node.
 * @returns {void} No return value
 */
function validateImport(importDeclaration, context) {
  const importSource = getValue(importDeclaration);
  const re = /.*-test$/i;

  if (importSource.match(re)) {
    context.report({
      message: REPORT_MESSAGE,
      node: importDeclaration
    });
  }
}

module.exports = {
  docs: {
    description:
      'Disallow importing of "-test.js" in a test file, which causes the module and tests from the imported file to be executed again.',
    category: 'Testing',
    recommended: false
  },
  meta: {
    message: REPORT_MESSAGE
  },

  create: function create(context) {
    return {
      ImportDeclaration(node) {
        validateImport(node, context);
      }
    };
  }
};
