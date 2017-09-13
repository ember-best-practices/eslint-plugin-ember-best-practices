
1.0.0 / 2017-09-13
==================

  * Fix `no-anonymous-once` not recognizing context function
  * Fix `no-global-jquery` returning false positive for var assignment #85
  * Fix logic to detect jQuery being assigned to a var
  * Create `no-jquery-selector` rule

0.9.0 / 2017-08-31
==================

  * Fixing rule `no-jquery-methods` to remove reference to `Ember`
  * Add tests for rule `no-jquery-methods`
  * Update docs and rule `no-jquery-methods` to include checks for CallExpressions
  * Adding new rule: `no-anonymous-once`

0.8.0 / 2017-08-15
==================

  * Add test for rule `no-side-effect-cp`
  * Fix `imports` util
  * Update guide for `no-jquery-method`
  * Update default BLACKLIST from config `no-jquery`
  * Fix RELEASE.md

0.7.1 / 2017-06-27
==================

  * Fixing issue #47 "const { $ } = Ember; still triggers no-global-jquery" 

0.7.0 / 2017-06-27
==================

  * Adding new rule: require-ember-lifeline

0.6.1 / 2017-06-23
==================

  * Fixing no-global-jquery to include references to `jQuery`

0.6.0 / 2017-06-22
==================

  * Add rule against using specific deprecated jQuery Methods (Blacklisted) (#59)
  * Fix typo


0.5.1 / 2017-05-22
==================

  * Fix repository URL
  * Setup coveralls integration
  * Add badges to README
  * Add RELEASE.md to document release process

0.5.0 / 2017-05-01
==================

  * Implements rule to catch sendAction calls
  * Clean up text, scope initOverride
  * Add new rule: no-broken-super-chain
  * Fix typo: mutliple -> multiple
  * Fix typo: incuring -> incurring
  * Fix typo: recieve -> receive
  * Update README.md
  * Add a message explaining how to fix computed properties with no dependent keys.
  * infromation => information
  * Update package.json; set repository field for npm
  * Fix incorrect installation instruction
	
