const { get } = require('../utils/get');

const JQUERY_ALIASES = ['$', 'jQuery'];

function isJQueryCallee(node, name = null) {
  const calleePropertyNameisJquery = get(node, 'object.callee.property.name') === '$';
  const calleeNameIsJquery = get(node, 'object.callee.name') === '$';
  const calleeNameIsLocalJquery = get(node, 'object.callee.name') === name;
  const ObjectNameisLocalJquery = get(node, 'object.name') === name;

  return calleePropertyNameisJquery
    || calleeNameIsJquery
    || calleeNameIsLocalJquery
    || ObjectNameisLocalJquery;
}

function isVariableAssigmentJquery(node) {
  const varDecIDName = get(node, 'id.name');
  // Get the name of what was assigned to the variable.
  const varAssignment = get(node, 'init.callee.property.name')
    || get(node, 'init.property.name')
    || get(node, 'init.name')
    || '';
  const varAssignmentIsJquery = JQUERY_ALIASES.includes(varAssignment);

  return varAssignmentIsJquery ? varDecIDName : null;
}

module.exports = {
  isJQueryCallee,
  isVariableAssigmentJquery,
  JQUERY_ALIASES
};
