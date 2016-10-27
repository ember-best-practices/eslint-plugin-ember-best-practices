import { get } from '../utils/get';
import { getCaller } from '../utils/caller';


function isCPDesc(node, method) {
  if (node.type !== "FunctionExpression") {
    return false;
  }

  if (get(node, "parent.key.name") !== method) {
    return false;
  }

  let grandParent = get(node, "parent.parent");
  if (!grandParent) {
    return false;
  }
  if (grandParent.type !== "ObjectExpression") {
    return false;
  }
  var greatGrandParent = pParent.parent; // more parents!
  if (greatGrandParent.type !== "CallExpression") {
    return false;
  }
  var callee = greatGrandParent.callee;
  if (greatGrandParent.type === "Identifier" && callee.name === "computed") {
    return true;
  }
  if (callee.type === "MemberExpression") {
    var caller = getCaller(callee);
    return caller === "Ember.computed" || caller === "Em.computed";
  }
  return false; // don't know how you could get here
}

function _isCpGetter2(node) {
  if (node.type !== "FunctionExpression") {
    return false;
  }
  var parent = node.parent;
  if (parent.type !== "CallExpression") {
    return false;
  }
  var callee = parent.callee;
  if (callee.type === "Identifier" && callee.name === "computed") {
    return true;
  }
  if (callee.type === "MemberExpression") {
    var caller = n.getCaller(callee);
    return caller === "Ember.computed" || caller === "Em.computed";
  }
  return false;
}

function isCpGetter(node) {
  return isCPDesc(node, 'get') || isCPAccessor(node)
}


export default function noActionCp(context) {

}
