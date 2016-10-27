import { get } from '../utils/get';
import { getCaller, cleanCaller } from '../utils/caller';
import { isCPGetter } from '../utils/computer-property';

const SENDERS = ['send', 'sendAction', 'sendEvent', 'Em.sendEvent', 'Ember.sendEvent'];

export default function noActionCp(context) {
  let inCPGettter = false;

  return {
    FunctionExpression(node) {
      if (isCPGetter(node)) {
        inCPGettter = true;
      }
    },
    'FunctionExpression:exit'(node) {
      if (isCPGetter(node)) {
        inCPGettter = false;
      }
    },
    CallExpression(node) {
      if (inCPGettter) {
        let caller = cleanCaller(getCaller(node));

        if (SENDERS.indexOf(caller) !== -1) {
          context.report(node, 'Do not send events or actions in Computed Properties. This will cause data flow issues in the application, where the accessing of a property causes some side-effect. You should only send actions on behalf of user initiated events. Please see the following guide for more infromation: http://github.com/chadhietala/ember-best-practices/files/guides/no-action-cp.md');
        }
      }
    }
  };
}
