/**
 * @fileOverview Require the use of ember-lifeline's lifecycle aware methods over Ember.run.*.
 * @author Steve Calvert
 */

const { getCaller, cleanCaller } = require('../utils/caller');
const { getEmberImportBinding } = require('../utils/imports');
const { collectObjectPatternBindings } = require('../utils/destructed-binding');

let DISALLOWED_OBJECTS = ['Ember.run', 'run'];
let RUN_METHODS = ['later', 'debounce', 'throttle'];
const LIFELINE_METHODS = ['runTask', 'debounceTask', 'throttleTask'];

function getMessage(actualMethodUsed) {
  let method = actualMethodUsed.split('.').pop();
  let lifelineEquivalent = LIFELINE_METHODS[RUN_METHODS.indexOf(method)];

  return `Please use ${lifelineEquivalent} from ember-lifeline instead of ${actualMethodUsed}.`;
}

function mergeDisallowedCalls(objects) {
  return objects
    .reduce((calls, obj) => {
      RUN_METHODS.forEach((method) => {
        calls.push(`${obj}.${method}`);
      });

      return calls;
    }, []);
}

module.exports = {
  docs: {
    description: 'Please use runTask from ember-lifeline instead of Ember.run.later.',
    category: 'Best Practices',
    recommended: false
  },
  meta: {
    message: getMessage
  },
  create(context) {
    let emberImportBinding;
    let disallowedCalls = mergeDisallowedCalls(DISALLOWED_OBJECTS);

    return {
      ImportDefaultSpecifier(node) {
        emberImportBinding = getEmberImportBinding(node);
      },

      ObjectPattern(node) {
        if (emberImportBinding) {
          disallowedCalls = disallowedCalls.concat(
            mergeDisallowedCalls(
              collectObjectPatternBindings(node, {
                [emberImportBinding]: ['run']
              })
            )
          );
        }
      },

      MemberExpression(node) {
        let caller = cleanCaller(getCaller(node));

        if (disallowedCalls.includes(caller)) {
          context.report(node, getMessage(caller));
        }
      }
    };
  }
};
