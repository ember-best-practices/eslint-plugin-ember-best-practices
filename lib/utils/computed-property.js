const { get } = require('./get');
const { getCaller } = require('./caller');

function isCPDesc(node, method) {
  if (node.type !== 'FunctionExpression') {
    return false;
  }

  if (get(node, 'parent.key.name') !== method) {
    return false;
  }

  let grandParent = get(node, 'parent.parent');
  if (!grandParent) {
    return false;
  }
  if (grandParent.type !== 'ObjectExpression') {
    return false;
  }
  let greatGrandParent = grandParent.parent; // more parents!
  if (greatGrandParent.type !== 'CallExpression') {
    return false;
  }
  let callee = greatGrandParent.callee;
  if (greatGrandParent.type === 'Identifier' && callee.name === 'computed') {
    return true;
  }
  if (callee.type === 'MemberExpression') {
    let caller = getCaller(callee);
    return caller === 'Ember.computed' || caller === 'Em.computed';
  }
  return false; // don't know how you could get here
}

function isPrototypeExtCP(node) {
  if (node.type !== 'FunctionExpression') {
    return false;
  }

  return get(node, 'parent.property.name');
}

function isCPAccessor(node) {
  if (node.type !== 'FunctionExpression') {
    return false;
  }

  let parent = node.parent;
  if (parent.type !== 'CallExpression') {
    return false;
  }

  let callee = parent.callee;
  if (callee.type === 'Identifier' && callee.name === 'computed') {
    return true;
  }

  if (callee.type === 'MemberExpression') {
    let caller = getCaller(callee);
    return caller === 'Ember.computed' || caller === 'Em.computed';
  }
  return false;
}

module.exports = function isCPGetter(node) {
  return isCPDesc(node, 'get') || isCPAccessor(node) || isPrototypeExtCP(node);
};

