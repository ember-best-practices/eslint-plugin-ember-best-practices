/**
 * @fileOverview Disallow use of lifecycle events using `.on()`.
 * @author Chad Hietala
 */
'use strict';

const { collectObjectPatternBindings } = require('../utils/destructed-binding');
const { getEmberImportBinding } = require('../utils/imports');

const MESSAGE = 'Do not use events for lifecycle hooks. Please use the actual hooks instead: https://github.com/chadhietala/ember-best-practices/blob/master/guides/rules/no-lifecycle-events.md';

function isOn(node) {
  return node.name === 'on';
}

function isEmber(node) {
  return node.name === 'Ember';
}

module.exports = {
  docs: {
    description: 'Disallow use of lifecycle events using `.on()`',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    var emberImportBinding;
    let destructedBindings = [];

    return {
      ObjectPattern(node) {
        /**
         * Retrieves the deconstructed bindings from the Ember import, accounting for aliasing
         * of the import.
         */
        if (emberImportBinding) {
          destructedBindings = destructedBindings.concat(collectObjectPatternBindings(node, {
            [emberImportBinding]: ['on']
          }));
        }
      },

      ImportDeclaration(node) {
        if (node.source.value === '@ember/object/evented') {
          node.specifiers.forEach((specifier) => {
            if (isOn(specifier.imported)) {
              context.report(node, MESSAGE);
            }
          });
        }
      },

      ImportDefaultSpecifier(node) {
        emberImportBinding = getEmberImportBinding(node);
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
          if (destructedBindings.includes(node.callee.name)) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
