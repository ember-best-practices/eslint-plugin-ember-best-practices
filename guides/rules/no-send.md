# No send()

**TL;DR: Use closure actions instead of bubbling actions via send**

Before v1.13 Ember's only way to deal with actions was through a bubbling system by calling `sendAction` or `send`. This changed when closure actions got introduced into the system and changed the paradigm to simpler JS function calls.

References:
[Ember 1.13 release post](http://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_closure-actions)
[Ember Best Practices: Stop bubbling actions and use closure actions by Dan McClain](https://dockyard.com/blog/2015/10/29/ember-best-practice-stop-bubbling-and-use-closure-actions)
