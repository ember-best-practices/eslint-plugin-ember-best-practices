/**
 * @fileOverview Disallow the use of specific jQuery methods.
 * @author Marc Lynch
 */
'use strict';

/**
 * Determines if this expression matches the method blacklist invocation.
 * @param {ASTNode} node The identifier node.
 * @returns {Boolean} Returns true if the expression matches, otherwise false.
 */

const BLACKLIST = [
  'add', 'addBack', 'after', 'ajaxComplete', 'ajaxError', 'ajaxSend', 'ajaxStart',
  'ajaxStop', 'ajaxSuccess', 'andSelf', 'before', 'bind', 'change', 'clearQueue',
  'clone', 'contents', 'contextmenu', 'dblclick', 'delay', 'delegate', 'dequeue', 'detach',
  'end', 'error', 'fadeIn', 'fadeTo', 'fadeToggle', 'finish', 'focusin', 'focusout', 'hover',
  'insertAfter', 'insertBefore', 'keydown', 'keypress', 'keyup', 'last', 'load', 'mousedown',
  'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'next',
  'nextAll', 'nextUntil', 'not', 'parentsUntil', 'prepend', 'prependTo', 'prev', 'revUntil',
  'promise', 'queue', 'removeData', 'removeProp', 'replaceAll', 'replaceWith', 'resize', 'scroll',
  'scrollLeft', 'select', 'serialize', 'show', 'size', 'slice', 'slideDown', 'slideToggle', 'stop',
  'submit', 'toArray', 'toggle', 'toggleClass', 'unbind', 'undelegate', 'unload', 'unwrap', 'wrap',
  'wrapAll', 'wrapInner'
];

module.exports = {
  docs: {
    category: 'Best Practices',
    recommended: true
  },
  meta: {
    blacklist: BLACKLIST
  },
  create(context) {
    return {
      MemberExpression(node) {
        let propertyName = node.property.name;
        let blackListName = BLACKLIST.includes(propertyName) ? propertyName : false;
        let isThisExpression = node.object && node.object.type === 'ThisExpression';

        if (!isThisExpression && blackListName) {
          context.report({ node: node.property, message: `The use of ${blackListName} method has been deprecated.` });
        }
      }
    };
  }
};
