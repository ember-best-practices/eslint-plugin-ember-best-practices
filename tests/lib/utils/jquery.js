const assert = require('assert');
const {
  isJQueryCallee,
  isVariableAssigmentGlobalJquery,
  isVariableAssigmentEmberJquery,
  isVariableAssigmentJquery
} = require('../../../lib/utils/jquery');
const {
  jqueryNodes,
  emberJqueryNodes,
  notJqueryNodes
} = require('../../mocks/jquery-mocks');

describe('jquery utils', function() {
  describe('isJQueryCallee', function() {
    it('should return true when the callee is global jQuery', function() {
      let node = jqueryNodes['object.callee.property.name'];
      assert.equal(isJQueryCallee(node), true);

      node = jqueryNodes['object.name'];
      assert.equal(isJQueryCallee(node), true);

      node = jqueryNodes['object.callee.name'];
      assert.equal(isJQueryCallee(node), true);
    });

    it('should return true when the callee is local jQuery', function() {
      const localJqueryArray = ['local$', 'localJayQuery'];
      let node = Object.assign({}, jqueryNodes['object.callee.property.name']);
      node.object.callee.property.name = 'local$';
      assert.equal(isJQueryCallee(node, localJqueryArray), true);

      node = Object.assign({}, jqueryNodes['object.name']);
      node.object.name = 'local$';
      assert.equal(isJQueryCallee(node, localJqueryArray), true);

      node = Object.assign({}, jqueryNodes['object.callee.name']);
      node.object.callee.name = 'local$';
      assert.equal(isJQueryCallee(node, localJqueryArray), true);
    });

    it('should return false when the callee is not jQuery', function() {
      const localJqueryArray = ['local$', 'localJayQuery'];
      let node = notJqueryNodes['object.callee.property.name'];
      assert.equal(isJQueryCallee(node, localJqueryArray), false);

      node = notJqueryNodes['object.name'];
      assert.equal(isJQueryCallee(node, localJqueryArray), false);

      node = notJqueryNodes['object.callee.name'];
      assert.equal(isJQueryCallee(node, localJqueryArray), false);
    });
  });

  describe('isVariableAssigmentGlobalJquery', function() {
    it('should return true when the var assignment is global jQuery', function() {
      const node = jqueryNodes['init.name'];
      assert.equal(isVariableAssigmentGlobalJquery(node), true);
    });
    it('should return false when the var assignment is not jQuery', function() {
      const node = notJqueryNodes['init.name'];
      assert.equal(isVariableAssigmentGlobalJquery(node), false);
    });
    it('should return false when the var assignment is Ember jQuery', function() {
      const node = emberJqueryNodes['init.callee.property.name'];
      assert.equal(isVariableAssigmentGlobalJquery(node), false);
    });
  });

  describe('isVariableAssigmentEmberJquery', function() {
    it('should return true when the var assignment is Ember jQuery', function() {
      const node = emberJqueryNodes['init.callee.property.name'];
      assert.equal(isVariableAssigmentEmberJquery(node), true);
    });
    it('should return false when the var assignment is global jQuery', function() {
      const node = jqueryNodes['init.name'];
      assert.equal(isVariableAssigmentEmberJquery(node), false);
    });
    it('should return false when the var assignment is not jQuery', function() {
      const node = notJqueryNodes['init.name'];
      assert.equal(isVariableAssigmentEmberJquery(node), false);
    });
  });

  describe('isVariableAssigmentJquery', function() {
    it('should return true when the var assignment\'s name is jQuery', function() {
      let node = jqueryNodes['init.callee.property.name'];
      assert.equal(isVariableAssigmentJquery(node), true);

      node = jqueryNodes['init.name'];
      assert.equal(isVariableAssigmentJquery(node), true);

      node = jqueryNodes['init.property.name'];
      assert.equal(isVariableAssigmentJquery(node), true);
    });
    it('should return false when the var assignment\'s name is not jQuery', function() {
      let node = notJqueryNodes['init.callee.property.name'];
      assert.equal(isVariableAssigmentJquery(node), false);

      node = notJqueryNodes['init.name'];
      assert.equal(isVariableAssigmentJquery(node), false);

      node = notJqueryNodes['init.property.name'];
      assert.equal(isVariableAssigmentJquery(node), false);
    });
  });
});
