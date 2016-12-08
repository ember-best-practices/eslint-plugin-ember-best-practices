const { get, getParent } = require('../../utils/get');

function _getCondition(node) {
  return node.test ? node.test.callee : null;
}

function _isBrowser(node) {
  let callee = _getCondition(node);

  return callee && callee.name === 'isBrowser';
}

function _isEnvironmentBrowser(node) {
  let callee = _getCondition(node);

  if (callee) {
    let obj = callee.object;
    let prop = callee.property;

    return obj && obj.name === 'environment' && prop && prop.name === 'isBrowser';
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

function getEnvironmentImportBinding(node) {
  if (get(node, 'parent.source.raw').includes('ember-stdlib/utils/environment')) {
    return node.local.name;
  }
}

module.exports = {
  isBrowser,
  isEnvironmentBrowser,
  getEnvironmentImportBinding
};