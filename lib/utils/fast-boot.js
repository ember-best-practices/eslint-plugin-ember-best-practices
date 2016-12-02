const { getParent } = require('../utils/common');

function isEnvironmentBrowser(node) {
  let callee = node.test.callee;

  if (callee) {
    let obj = callee.object;
    let prop = callee.property;

    return obj.name === 'environment' && prop.name === 'isBrowser';
  }

  return false;
}

function isGuarded(node) {
  return getParent(node, (node) => node.type === 'IfStatement' && isEnvironmentBrowser(node));
}

module.exports = {
  isGuarded
};