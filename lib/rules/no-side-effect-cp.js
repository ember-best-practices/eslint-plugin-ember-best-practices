/**
 * @fileOverview Disallow use of computed properties that include side-effect producing calls.
 */

const { get } = require('../utils/get');
const { getCaller, cleanCaller } = require('../utils/caller');
const isCPGetter = require('../utils/computed-property');
const { getEmberImportBinding, collectImportBindings } = require('../utils/imports');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

function sideEffectsForEmber(importName) {
  return [
    `${importName}.sendEvent`,
    `${importName}.set`,
    `${importName}.setProperties`
  ];
}

const SIDE_EFFECTS = Object.freeze([].concat(
  'this.send',
  'this.sendAction',
  'this.trigger',
  sideEffectsForEmber('this'),
  sideEffectsForEmber('Em'),
  sideEffectsForEmber('Ember')
));

const MESSAGE = 'Do not send events or actions in Computed Properties. This will cause data flow issues in the application, where the accessing of a property causes some side-effect. You should only send actions on behalf of user initiated events. Please see the following guide for more information: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/blob/master/guides/rules/no-side-effect-cp.md';

module.exports = {
  docs: {
    description: 'Disallow use of computed properties that include side-effect producing calls',
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    let inCPGetter = false;
    let importedSideEffectBindings = [];
    let emberImportBinding, importedCPBinding;
    let sideEffects = SIDE_EFFECTS.slice();

    return {
      ImportDeclaration(node) {
        importedSideEffectBindings = importedSideEffectBindings.concat(collectImportBindings(node, {
          '@ember/object': ['set', 'setProperties'],
          '@ember/object/events': ['sendEvent']
        }));
      },

      ObjectPattern(node) {
        if (emberImportBinding) {
          sideEffects = sideEffects.concat(collectObjectPatternBindings(node, {
            [emberImportBinding]: ['set', 'setProperties', 'sendEvent']
          }));
        }
      },

      ImportDefaultSpecifier(node) {
        let localEmberImportBinding = getEmberImportBinding(node);
        if (localEmberImportBinding) {
          emberImportBinding = localEmberImportBinding;
          sideEffects = sideEffects.concat(sideEffectsForEmber(emberImportBinding));
        }

        if (get(node, 'parent.source.value') === '@ember/computed') {
          importedCPBinding = node.local.name;
        }
      },

      FunctionExpression(node) {
        if (isCPGetter(node, emberImportBinding, importedCPBinding)) {
          inCPGetter = node;
        }
      },
      'FunctionExpression:exit'(node) {
        if (node === inCPGetter) {
          inCPGetter = null;
        }
      },

      CallExpression(node) {
        if (inCPGetter) {
          let caller = cleanCaller(getCaller(node));
          let hasSideEffect = sideEffects.includes(caller) || importedSideEffectBindings.includes(caller);
          if (hasSideEffect) {
            context.report(node, MESSAGE);
          }
        }
      }
    };
  }
};
