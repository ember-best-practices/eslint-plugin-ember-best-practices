const { get } = require('./get');

function collectImportBindings(node, imports) {
  let sources = Object.keys(imports);
  let sourceName = sources[sources.indexOf(node.source.value)];
  let importedBindings = imports[sourceName];

  if (sourceName) {
    return node.specifiers.filter((specifier) => {
      let name = get(specifier, 'imported.name');
      return 'ImportSpecifier' === specifier.type && name && importedBindings.includes(name);
    }).map((specifier) => specifier.local.name);
  }

  return [];
}

function getEmberImportBinding(node) {
  if (get(node, 'parent.source.raw') === '\'ember\'') {
    return node.local.name;
  }
}

module.exports = {
  collectImportBindings,
  getEmberImportBinding
};
