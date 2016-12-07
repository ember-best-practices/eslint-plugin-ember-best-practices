# No Computed Property Side-effects

In Ember we want data to flow down from the route and send actions up modifiy that data. This means that data flows from the top of the application tree structure and passes down to the child nodes. These children are not the owners of the data passed to them. Instead, they derive their own data based on the passed data. Those children can then choose to pass forward that derived data to its child and so on. If a child needs to mutate data passed to it, it must ask for it by firing any action. Once the owner makes the mutation, that change is propagated back down.

When we send actions in computed properties we are violating this pattern which makes systems much more difficult to reason about. Specifically with actions in computed propertites what we are semantically saying is:

1. When I first access this property send an action
2. This action will not fire again unless the dependent key of this computed property changes.

The fact that property access could cause some side effect to occur is less than ideal as it forces you to write code that reacts to data changing over time instead of controlling the side effects based on user input into the system. Often when we see this pattern we see that one component is responsible displaying the data and another unrelated component is handles the action. This then forces a developer to look in mutliple places to understand how the component works. We can see this in the following example

```
<input value={{firstName}} />
{{if isValid 'VALID' 'INVALID'}}
```

```
Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.firstName = null;
  },
  nameChanged: Ember.computed('firstName', function() {
    this.sendAction(this.get('validateAction'), this.get('firstName')); // Somebody else does the validation
  })
})
```

As you can see above, when we do side-effect programing we are forced to remove concerns of one component into another. More specically, `isValid` and the `validateAction` are passed to the component to call whenever the component changes it's `firstName` property. We can't look at just this component to see how validation is performed on our input. In contrast we can localize this logic and directly turn browser events e.g. oninput into semantic event `validateNameLength`. Here we are directly controlling the side-effects by taking an event in and directly handleing it, as opposed to rebroadcasting based on `firstName` changing.

```
<input value={{firstName}} oninput={{action 'validateNameLength'}} />
{{if isValid 'VALID' 'INVALID'}}
```

```
Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.isValid = false;
    this.firstName = null;
  },
  actions: {
    validateNameLength() {
      if (this.firstName.length > 10) {
        this.set('isValid', true);
      } else {
        this.set('isValid', false);
      }
    }
  }
})
```

