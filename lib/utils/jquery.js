const { get } = require('../utils/get');

const JQUERY_ALIASES = ['$', 'jQuery'];

function isJQueryCallee(node, name = null) {
  const calleePropertyNameisJquery = JQUERY_ALIASES.includes(get(node, 'object.callee.property.name'));
  const calleeNameIsJquery = JQUERY_ALIASES.includes(get(node, 'object.callee.name'));
  const calleeNameIsLocalJquery = get(node, 'object.callee.name') === name;
  const ObjectNameisLocalJquery = get(node, 'object.name') === name;

  return calleePropertyNameisJquery
    || calleeNameIsJquery
    || calleeNameIsLocalJquery
    || ObjectNameisLocalJquery;
}

function isVariableAssigmentGlobalJquery(node) {
  const varDecIDName = get(node, 'id.name');
  // Get the name of what was assigned to the variable.
  const varAssignment = get(node, 'init.callee.property.name') || get(node, 'init.name');
    // A variable's callee object's name tells us whether this is a usage of Ember.$ or global $.
  const varCalleeObjName = get(node, 'init.callee.object.name');
  const varAssignmentIsGlobalJquery = JQUERY_ALIASES.includes(varAssignment) && varCalleeObjName !== 'Ember';

  return varAssignmentIsGlobalJquery ? varDecIDName : null;
}

module.exports = {
  isJQueryCallee,
  isVariableAssigmentGlobalJquery,
  JQUERY_ALIASES
};
