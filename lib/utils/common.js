
function getParent(node, predicate) {
  while (node) {
    if (predicate(node)) {
      return node;
    }

    node = node.parent;
  }

  return null;
}

module.exports = {
  getParent
};