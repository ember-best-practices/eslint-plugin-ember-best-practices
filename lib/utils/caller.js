function getMemberExpression(node) {
  let obj = node.object.type === "ThisExpression" ? "this" :
    (node.object.type === "MemberExpression" ? getCaller(node.object) : node.object.name);
  let property = node.property.name || node.property.value;
  return property ? `${obj}.${property}` : obj;
}

export function getCaller(node) {
  if (node.type === "MemberExpression") {
    return getMemberExpression(node);
  }

  let callee = node.callee;

  if (!callee) {
    return '';
  }

  if (callee.type === "MemberExpression") {
    return getMemberExpression(callee);
  }
  return callee.name;
}
