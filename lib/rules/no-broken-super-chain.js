/**
 * @fileOverview Prevent the absence of this._super() in init() calls or the use of this prior to this._super()
 * @author Quinn C Hoyer
 */

const MESSAGES = {
  noSuper: '\'this._super(...arguments)\' must be called in init in this Ember modules',
  noThisBeforeSuper: 'Must call \'this._super(...arguments)\' before accessing `this`',
  tooManySupers: 'Only call `this._super(...arguments)` once per init()'
};

// TODO: Make this configurable
const EMBER_MODULES_WITH_SUPER_CHAIN = {
  Component: true,
  Mixin: true,
  Route: true,
  Controller: true,
  View: true
};

let initOverride = null;

/**
 * Determines if this is an init method in an extension of Ember[EMBER_MODULES_WITH_SUPER_CHAIN.*]
 * @param {Node} node
 */
function isInit(node) {
  if (node.type === 'FunctionExpression' && node.parent && node.parent.key && node.parent.key.name === 'init') {

    if (node.parent.parent
      && node.parent.parent.parent
      && node.parent.parent.parent.callee
      && node.parent.parent.parent.callee.object
      && node.parent.parent.parent.callee.object.object
      && node.parent.parent.parent.callee.object.object.name === 'Ember') {
      return (node.parent.parent.parent.callee.object.property
        && EMBER_MODULES_WITH_SUPER_CHAIN[node.parent.parent.parent.callee.object.property.name]);
    }
  }

  return false;
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent the absence of `this._super(...arguments)` in `init()` calls or the use of `this` prior to `this._super()`',
      category: 'Best Practices',
      recommended: true
    },
    messages: MESSAGES
  },
  create(context) {
    return {
      onCodePathStart(codePath, node) {
        if (isInit(node)) {
          initOverride = {
            superCalled: false,
            superCalledFirst: false
          };
        }
      },
      onCodePathEnd(codePath, node) {
        if (initOverride && isInit(node)) { // TODO: Maybe check against codepath.name
          if (!initOverride.superCalled) {
            context.report({
              message: MESSAGES.noSuper,
              node
            });
          }

          initOverride = null;
        }
        return;
      },
      'CallExpression:exit'(node) {
        if (initOverride) {
          const property = node.callee.property;
          if (property && property.type === 'Identifier' && property.name === '_super') {
            if (initOverride.superCalled) {
              context.report({
                message: MESSAGES.tooManySupers,
                node
              });
            } else {
              initOverride.superCalled = true;
            }
          }
        }
      },
      'Program:exit'() {
        initOverride = null;
      }
    };
  }
};