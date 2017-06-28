# Release Process

The following is the release process you should follow to publish a new version of `eslint-plugin-ember-best-practices`.

## Preparing for Release

First, we need to update the `CHANGELOG.md` file for the project. This requires having [`git-extras`](https://github.com/tj/git-extras) installed.

Checkout the current `master` version of the repo and run:

```bash
git changelog
```

Clean up the generated changelog by inserting the appropriate verion number and removing merge commits and previous release commits if necessary.

Next, we need to update `AUTHORS.txt` to make sure we acknowledge all our wonderful contributors. Simply run:

```bash
npm run generate-authors
```

That should update `AUTHORS.txt` with a sorted list of names and email address based on the git history of the repo.

Review all the changes so far and then commit them with a message like:

```bash
git commit -am "Update CHANGELOG and AUTHORS for x.x.x"
```

Where `x.x.x` is the version you are releasing.

## Bump The Version

Next, we bump the version of the addon and tag it. You can do this by using the default `npm version` command, like so:

```bash
npm version x.x.x
```

That should bump the version in `package.json`, commit it, and then tag it.

Next, push the version bump and the changelog changes to the repository (ensure you push the new tag as well).

## Publish The Release

Once the changes have been pushed, run:

```bash
npm publish
```

To actually publish the new release.

Finally, update the [GitHub Releases page](https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/releases) with a new release; using the changelog info as the release notes.
