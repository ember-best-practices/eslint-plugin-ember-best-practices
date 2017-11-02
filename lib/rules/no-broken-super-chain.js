/**
 * @fileOverview Prevent the absence of this._super() in init() calls or the use of this prior to this._super()
 */

const MESSAGES = {
  noSuper: '`this._super(...arguments)` must be called in',
  tooManySupers: 'Only call `this._super(...arguments)` once per lifecycle hook',
  argsNotPassedToSuper: '...arguments need to be passed to this._super() call'
};

const LIFECYCLE_HOOKS = ['init', 'willDestroy', 'willDestroyElement', 'destroy'];

function isExtend(node) {
  return node && node.callee && node.callee.property && node.callee.property.name === 'extend';
}

function isSuperCall(lineWithinFn) {
  if (lineWithinFn.type !== 'MemberExpression') {
    return false;
  }

  let isSuperCall = false;

  if (lineWithinFn.object.type === 'ThisExpression') {
    isSuperCall = lineWithinFn.property.type === 'Identifier' && lineWithinFn.property.name === '_super';
  } else if (lineWithinFn.object.type === 'MemberExpression') {
    isSuperCall = lineWithinFn.object.property.name === '_super';
  }

  return isSuperCall;
}

function wereArgumentsPassedToSuper(expression) {
  const callee = expression.callee;

  if (!expression || callee.type !== 'MemberExpression') {
    return;
  }

  if (callee.property.name === '_super') {
    const firstArgumentToSuper = expression.arguments[0];
    return firstArgumentToSuper && firstArgumentToSuper.type === 'SpreadElement' && firstArgumentToSuper.argument.name === 'arguments';
  } else if (callee.property.name === 'apply') {
    const args = expression.arguments;
    return args.length >= 2 && args[0].type === 'ThisExpression' && args[1].name === 'arguments';
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent the absence of `this._super(...arguments)` in calls to various lifecycle hooks or the use of `this` prior to `this._super()`',
      category: 'Best Practices',
      recommended: true
    },
    messages: MESSAGES
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isExtend(node)) {
          let superCount = 0;
          const extendedObjects = node.arguments;

          extendedObjects.forEach(extendedObj => {
            extendedObj.properties.forEach(property => {
              if (LIFECYCLE_HOOKS.includes(property.key.name)) {
                const propertyFnBody = property.value.body;

                if (propertyFnBody && propertyFnBody.body) {
                  let expression;
                  property.value.body.body.forEach(fnBody => {
                    expression = fnBody.expression;
                    if (expression.type === 'CallExpression') {
                      const line = expression.callee;
                      if (isSuperCall(line)) {
                        if (!wereArgumentsPassedToSuper(expression)) {
                          context.report({
                            node: fnBody,
                            message: context.meta.messages.argsNotPassedToSuper
                          });
                        }
                        superCount++;
                      }
                    }
                  });

                  if (superCount === 0) {
                    context.report({
                      node: property,
                      message: `${context.meta.messages.noSuper} ${property.key.name}`
                    });
                  } else if (superCount > 1) {
                    context.report({
                      node: property,
                      message: context.meta.messages.tooManySupers
                    });
                  }

                  superCount = 0;
                }
              }
            });
          });
        }
      }
    };
  }
};
