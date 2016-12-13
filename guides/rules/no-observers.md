# No Observers

**TL;DR: Use a computed property or lifecycle hooks**

Observers suffer from several issues when building applications at scale. These issues are:

- Eagerly computed
- Have no notion of a caller
- Data consistency

To unroll what this means consider the example below.

```
Component.extend({
  firstName: 'Chad',
  lastName: 'Hietala',
  fullName: undefined,
  fullDidChange: observer('firstName', 'lastName', function() {
    this.set('fullName',`${this.get('firstName')} ${this.get('lastName')}`);
  })
});
```

In the above example we have an observer that is watching the `firstName` and `lastName` properties in our component. When either of them change the observer will fire, setting `fullName` to the new value. Vast majority of the time this leads to `fullName` being computed more often than it needs to be. There is also an unexpected eventual consistency problem here. Consider we do the following.

```
this.set('firstName', 'Stefan');
<---------------------------------------- For a period here `fullName` is Stefan Hietala
this.set('lastName', 'Penner');
<---------------------------------------- Now `fullName` is Stefan Penner
```

Since observers eagerly compute we have this period in time where we have computed a `fullName` that is not what we actually care about. When we introduce many observers into an application this problem compounds on itself.

In contrast a computed property is lazily computed and memoized. This means that `firstName` and `lastName` can freely mutate and only when we do `this.get('fullName');` will the function body of the computed property run. This gives us a clear caller in terms of why the body of `fullName` was recomputed.

```
Component.extend({
  firstName: 'Chad',
  lastName: 'Hietala',
  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
```

Since computed properties are lazy we don't have the same data consistency problems with observers.

```
this.get('fullName'); <------------------ Computed property is computed to `Chad Hietala`
this.set('firstName', 'Stefan'); <------- Computed property does not recompute
this.set('lastName', 'Penner'); <-------- Computed property does not recompute
this.get('fullName'); <------------------ Computed property is computed to `Stefan Penner`
```

For more info please watch this video: [Observer Tip Jar](https://www.youtube.com/watch?v=vvZEddrClAQ)
