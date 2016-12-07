const { getParent } = require('../utils/get');

function _isBrowser(node) {
  return node.name === 'isBrowser';
}

function _isEnvironmentBrowser(node) {
  let callee = node.test.callee;

  if (callee) {
    let obj = callee.object;
    let prop = callee.property;

    return obj.name === 'environment' && _isBrowser(prop);
  }

  return false;
}

function isIfStatement(node) {
  return node.type === 'IfStatement';
}

function isBrowser(node) {
  return getParent(node, (node) => isIfStatement(node) && _isBrowser(node));
}

function isEnvironmentBrowser(node) {
  return getParent(node, (node) => isIfStatement(node) && _isEnvironmentBrowser(node));
}

module.exports = {
  isBrowser,
  isEnvironmentBrowser
};