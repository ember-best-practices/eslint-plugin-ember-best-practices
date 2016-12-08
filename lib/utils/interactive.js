const { getParent } = require('../utils/get');

const INTERACTIVE_LIFECYLE_HOOKS = [
  'willRender',
  'didRender',
  'willInsertElement',
  'didInsertElement'
];

function isInActions(node) {
  return !!getParent(node, (node) => node.type === 'Property' && node.key.name === 'actions');
}

function isInteractive(node) {
  return !!getParent(node, node => node.type === 'Property' && INTERACTIVE_LIFECYLE_HOOKS.includes(node.key.name));
}

module.exports = {
  isInActions,
  isInteractive
};