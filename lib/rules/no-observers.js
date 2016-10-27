function isObserver(node) {
  let { property, callee } = node;
  return property && property.name === 'observer' ||
         callee && callee.name === 'obsever';
}

const MESSAGE = `Do not use observers. Consider using computed properties instead. Please see following guide for more information: http://github.com/chadhietala/ember-best-practices/files/guides/no-observers.md`;

export default function noObservers(context) {
  return {
    MemberExpression(node) {
      if (isObserver(node)) {
        context.report(node.property, MESSAGE);
      }
    },

    CallExpression(node) {
      if (isObserver(node)) {
        context.report(node.callee, MESSAGE);
      }
    }
  };
};
