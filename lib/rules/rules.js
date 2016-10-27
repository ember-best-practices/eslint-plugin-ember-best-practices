const FrameworkObjects = ['Component', 'Route', 'Service', 'Helper'];
const FrameworkHooks = ['init', 'didReceiveAttrs'];

export default function(context) {
  let services = [];
  let errors = [];
  let members = [];

  function isUsingAttrsSnapShots(node) {
    if (node.key.name === 'didReceiveAttrs' && node.value.params.length > 0) {
      node.value.params.forEach((param) => {
        errors.push([param, 'Do not use the previous and new versions of attrs. If you need to do a comparsion on re-render stash the last value and compare the new value.']);
      })
    }
  }

  function isCPMissingDependentKey(node) {
    if (isCP(node)) {
      if (node.value.arguments.length === 1 && node.value.arguments[0].type === 'FunctionExpression') {
        errors.push([node.value.arguments[0], 'Missing dependent key. If you are working around a value being shared acrossed instances use `init`']);
      }
    }
  }

  function isCP(node) {
    return node.value.type === 'CallExpression' && node.value.callee.property.name === 'computed';
  }

  function isAttrs(node) {
    if (node.property.name === 'attrs' && node.object.type === 'ThisExpression') {
      errors.push([node.property, 'Do not use this.attrs.']);
    }
  }

  function isFrameWorkObject(node) {
    return node.object.type === 'Identifier' && FrameworkObjects.indexOf(node.object.name) === -1;
  }

  function isExtendingFrameworkObject(node) {
    if (isExtend(node) && isFrameWorkObject(node)) {
      errors.push([node, 'Do not create subclasses. Please use more compositional patterns described here.']);
    }
  }

  function isExtend(node) {
    return node.property.name === 'extend';
  }

  function isGetMethod(node) {
    return node.property.name === 'get' && node.object.type === 'ThisExpression';
  }

  function isService(node) {
    return services.indexOf(node.value) > -1
  }

  function isFrameworkHook() {
    return FrameworkHooks.indexOf(context.getScope().block.parent.key.name) > -1;
  }

  function isEagerLazyInjection(node) {
    if (isGetMethod(node) && isService(node.parent.arguments[0]) && isFrameworkHook()) {
      errors.push([node.parent.arguments[0], 'Do not pull on lazy injections in framework hooks. If you need a service eagerly please inject it through an initializer.']);
    }
  }

  function isMixin(node) {
    if (isExtend(node)) {
      if (node.parent.arguments.length > 1) {
        node.parent.arguments.filter((arg) => {
          return arg.type === 'Identifier'
        }).forEach((arg) => {
          errors.push([arg, 'Do not use Mixins. Please use more compositional patterns described here.']);
        });
      }
    }
  }

  function collectInjectedProperties(node) {
    if (node.value.type === 'CallExpression' && node.value.callee.property.name === 'service') {
      services.push(node.key.name);
    }
  }

  function isInjectedService(node) {
  	return node.value.callee && node.value.callee.property.name === 'service';
  }

  function emptyArgs(node) {
    return node.arguments.length === 0;
  }

  function isMissingInjectionName(node) {
    if (isInjectedService(node) && emptyArgs(node.value)) {
      errors.push([node.value.callee.property, 'Provide the name as a service to avoid reflection on the property name.'])
    }
  }

  function isSettingInCPGetter(node) {
    if (node.parent) {
     // console.log(node.parent.parent.parent)
    }
  }

  function isSendAction(node) {

  }

  function findMethod() {
    let scope = context.getScope().block;
    let top = true;
    let methodName;

    while (top) {
      if (scope.parent.type === 'Property') {
        if (scope.parent.parent.parent.type === 'CallExpression' && scope.parent.parent.parent.callee.property.name === 'extend') {
          methodName = scope.parent.key.name;
          top = false;
        }
      } else {
        scope = scope.parent;
      }
    }

    return methodName
  }

  function isSideEffect(node) {
    if (node.parent.callee && node.object.type === 'ThisExpression' && members.indexOf(node.property.name) === -1) {
      let currentMethod = findMethod();

      if (FrameworkHooks.indexOf(currentMethod) > -1) {
          console.log(node.property.name)
      }
    }
  }

  function collectMembers(node) {
    if (node.value.type === 'FunctionExpression') {
      members.push(node.key.name);
    }
  }

  return {
    MemberExpression(node) {
      isAttrs(node);
      isExtendingFrameworkObject(node);
      isMixin(node);
      isEagerLazyInjection(node);
      isSendAction(node);
      //isSideEffect(node);
      isSettingInCPGetter(node)

    },

    Property(node) {
      collectMembers(node);
      collectInjectedProperties(node);
      isCPMissingDependentKey(node);
      isUsingAttrsSnapShots(node);
      isMissingInjectionName(node);

    },

    'Program:exit'() {
      errors.forEach((err) => {
        context.report(err[0], err[1]);
      });
    },
  };
};

