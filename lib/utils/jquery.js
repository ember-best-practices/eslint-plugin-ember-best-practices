const { get } = require('../utils/get');

const JQUERY_ALIASES = ['$', 'jQuery'];

/**
 * Determines whether a given node's callee is jQuery.
 * @param {ASTNode} node
 * @param {...Array} localJqueryVars Array(s) of local variables that have jQuery assigned to them.
 * @return {Boolean}
 */
function isJQueryCallee(node, ...localJqueryVars) {
  const allJqueryAliases = localJqueryVars.reduce((accumulator, newArray) => {
    return accumulator.concat(newArray);
  }, JQUERY_ALIASES);

  const calleePropertyNameisJquery = allJqueryAliases.includes(get(node, 'object.callee.property.name'));
  const calleeNameIsJquery = allJqueryAliases.includes(get(node, 'object.callee.name'));
  const objectNameisJquery = allJqueryAliases.includes(get(node, 'object.name'));

  return calleePropertyNameisJquery
    || calleeNameIsJquery
    || objectNameisJquery;
}

/**
 * Helper function that returns the name of what was assigned to the variable.
 * @param {ASTNode} node
 * @return {String}
 */
function getVarAssignmentName(node) {
  // Get the name of what was assigned to the variable.
  return get(node, 'init.callee.property.name') || get(node, 'init.name') || get(node, 'init.property.name');
}

/**
 * Determines whether a variable assignment's callee is Ember/this.
 * @param {ASTNode} node
 * @return {Boolean}
 */
function isVarAssignmentCalleeEmber(node) {
  // A variable's callee object's name tells us whether this is a usage of Ember.$ or global $.
  const isVarCalleeObjNameEmber = get(node, 'init.callee.object.name') === 'Ember' || get(node, 'init.object.name') === 'Ember';
  // Whether or not the callee oject is `this.$`.
  const isVarCalleeObjThis = get(node, 'init.callee.object.type') === 'ThisExpression';

  return isVarCalleeObjNameEmber || isVarCalleeObjThis;
}

/**
 * Determines whether a variable's assignment is global jQuery.
 * @param {ASTNode} node
 * @return {Boolean}
 */
function isVariableAssigmentGlobalJquery(node) {
  return isVariableAssigmentJquery(node) && !isVarAssignmentCalleeEmber(node);
}

/**
 * Determines whether a variable's assignment is Ember jQuery.
 * @param {ASTNode} node
 * @return {Boolean}
 */
function isVariableAssigmentEmberJquery(node) {
  return isVariableAssigmentJquery(node) && isVarAssignmentCalleeEmber(node);
}

/**
 * Determines whether a variable's assignment is Ember jQuery.
 * @param {ASTNode} node
 * @return {Boolean}
 */
function isVariableAssigmentJquery(node) {
  return JQUERY_ALIASES.includes(getVarAssignmentName(node));
}

module.exports = {
  isJQueryCallee,
  isVariableAssigmentGlobalJquery,
  isVariableAssigmentEmberJquery,
  isVariableAssigmentJquery,
  JQUERY_ALIASES
};
