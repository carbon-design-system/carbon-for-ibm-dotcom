# Publishing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Release Candidates](#release-candidates)
- [Release](#release)
- [FAQ](#faq)
    - [How do I fix the repo state if I cancel during a publish?](#how-do-i-fix-the-repo-state-if-i-cancel-during-a-publish)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

> Steps for publishing the monorepo

1. Switch to the current release branch
2. Make sure your local branch is up-to-date by running
   `git pull upstream release/[version number]`
3. Run `yarn sync` to make sure all packages are synced
4. Make sure your git status is clean (will also be checked in our publish
   task), if not commit and push changes, then go to Step 1
5. Make sure dependencies are up-to-date by doing `yarn clean` && `yarn install`
6. Run `yarn build` to build all package assets
7. Set `GH_TOKEN` in your terminal ENV, the specific value will be for the
   `ibmdotcom-bot` functional ID and can be received from another team member.
8. Export value above by writing `export GH_TOKEN=XYZ`
9. Log into npm with publishing rights via `npm login`
10. Run `./tasks/publish.sh` with the appropriate flags (see release steps below)


## Release Candidates

11. Run
   `./tasks/publish.sh --conventional-commits --conventional-prerelease=* --preid rc --force-publish=*`
12. Confirm package changes

## Release

11. Run
   `./tasks/publish.sh ---exact --conventional-commits --create-release=github --git-remote upstream`
12. Confirm package changes

## FAQ

#### How do I fix the repo state if I cancel during a publish?

The first things Lerna will do are create a git tag and update `package.json`
versions. If you cancel before any packages publish, then you can do the
following:

```bash
# Delete the specific tag, usually something like v0.1.0
git tag -d name-of-tag
```

```bash
# Undo the last commit
git reset HEAD~

# Remove all staged files
git checkout -- .
```

You should be good to go after this!
