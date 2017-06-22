/**
 * @fileOverview Require the use of ember-lifeline's runTask over using Ember.run.later.
 * @author Steve Calvert
 */

const { getCaller, cleanCaller } = require('../utils/caller');
const { getEmberImportBinding } = require('../utils/imports');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

let LATER_PATTERNS = ['Ember.run.later', 'run.later'];

const MESSAGE = 'Please use runTask from ember-lifeline in favor of Ember.run.later.';

module.exports = {
  docs: {
    description: 'Please use runTask from ember-lifeline in favor of Ember.run.later.',
    category: 'Best Practices',
    recommended: false
  },
  meta: {
    message: MESSAGE
  },
  create(context) {
    let emberImportBinding;

    return {
      ObjectPattern(node) {
        if (emberImportBinding) {
          LATER_PATTERNS = LATER_PATTERNS.concat(collectObjectPatternBindings(node, {
            [emberImportBinding]: ['run']
          }));
        }
      },

      ImportDefaultSpecifier(node) {
        emberImportBinding = getEmberImportBinding(node);
      },

      MemberExpression(node) {
        let caller = cleanCaller(getCaller(node));

        if (LATER_PATTERNS.includes(caller)) {
          context.report(node, MESSAGE);
        }
      }
    };
  }
};
