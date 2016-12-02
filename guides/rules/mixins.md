# Issues With Mixins

Mixins are typically thought of good ways to share functionality between to objects. While this is true these abstracts can become very leaky and lead to code that is very difficult to reason about. Typically this arises when the Mixin creates implicit dependencies as to where it can and cannot be used. For example:

```
export default Route.extend(MyMixin, {
  model() {
    return this.fetchCard(123);
  }
});

export default Mixin.create({
  fetchCards(id) {
    return this.store.find(id).then((data) => {

        ranks = data.ranks.map((rank) => {
          if (rank > 2) {
            rank.isTop = true;
          } else {
            rank.isTop = false;
          }
        });

      this.controllerFor(’my-controller’).setProperties({
        type: data.type,
        actor: data.actor,
        ranks: rank
      });

      return data;
    });
  }
});
```

This example assumes that there is a store object on the consuming class. It also is going to set some properties on the consuming class which is another implicit side-effect. Another thing to note is because we assemble the concrete object at runtime (merging the mixins), we have to be careful about naming collisions with the consuming class. All of these downsides make this code make harder to test then other ways of sharing code.

## Solutions

When we want to share code we have several different options that do not suffer from a lot of the issues I described above. Those solutions are functions and dependency injection, both of which are compositional ways of both sharing functionality, but through explicitness and not obscurity. For example we can re-work this example as:

function createTopRanks(data) {
  return data.ranks.map((rank) => {
    if (rank > 2) {
      rank.isTop = true;
    } else {
      rank.isTop = false;
    }
});

export default Component.extend({
  model() {
    return this.store.find(123).then((data) => {
      this.controllerFor(‘my-controller’).setProperties({
        type: data.type,
        actor: data.actor,
        ranks: createTopRanks(data)
      });
    });
  }
});

In this approach we are admitting that the import piece is the data transform here. The rest of this functionality is framework APIs that do not require further abstraction.





