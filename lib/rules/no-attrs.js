function isAttrs(node) {
  return node.property.name === 'attrs' && node.object.type === 'ThisExpression';
}

export default function noAttrs(context) {
  return {
    MemberExpression(node) {
      if (isAttrs(node)) {
        context.report(node.property, `Do not use this.attrs. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-observers.md`);
      }
    }
  }
}
