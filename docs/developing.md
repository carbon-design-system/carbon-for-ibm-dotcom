# Developing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Setup](#setup)
- [Installing dependencies](#installing-dependencies)
- [Common tasks](#common-tasks)
- [Developing Locally](#developing-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [FAQ](#faq)
    - [CI checks are failing saying that it cannot find a dependency in offline mode](#ci-checks-are-failing-saying-that-it-cannot-find-a-dependency-in-offline-mode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Setup

Our repository requires that a forked repo is used for any work before 
contributing back to the repository. This includes regular team 
members/maintainers.

1. Fork the project by navigating to the main
   [repository](https://github.com/carbon-design-system/ibm-dotcom-library/) and
   clicking the **Fork** button on the top-right corner.

2. Navigate to your forked repository and copy the **SSH url**. Clone your fork
   by running the following in your terminal:

   ```
   $ git clone git@github.com:{ YOUR_USERNAME }/ibm-dotcom-library.git
   $ cd ibm-dotcom-library
   ```

   See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
   details on forking a repository.

3. Once cloned, you will see `origin` as your default remote, pointing to your
   personal forked repository. Add a remote named `upstream` pointing to the
   main `ibm-dotcom-library`:

   ```
   $ git remote add upstream git@github.com:carbon-design-system/ibm-dotcom-library.git
   $ git remote -v
   ```

4. Switch to our version of Node. If you are using (nvm
   [Node Version Manager](https://github.com/creationix/nvm)), you can run
   `nvm use` to quicky switch Node versions. If you are aren't using nvm, you
   can still check the `.nvmrc` dotfile in the root of this project to find the
   major stable version of Node we are using, and then you can switch manually.

## Installing dependencies

The IBM.com Library is built using a collection of packages all built in the same git
repository. You might have heard this setup described as a
[monorepo](https://en.wikipedia.org/wiki/Monorepo).

As a result, we use two pieces of tooling to help us managing installing
dependencies and publishing our packages. These include:

- [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for handling
  dependencies across all packages
- [Lerna](https://lerna.js.org/) for publishing packages, tagging versions, and
  more

In order for you to install all the dependencies in this project, you'll need to
[install Yarn](https://yarnpkg.com/en/docs/install) and run the following
command in your terminal:

```bash
yarn install
```

This will install all of the dependencies for every package in our project. In
addition, it allows us to link between packages that we are developing.

This strategy is particularly useful during development, and tooling like Lerna
will pick up on when packages are linked in this way and will automatically
update versions when publishing new versions of packages.

Next up, you'll most likely want to build all of the package files so that
things don't fail while you are working on a package. To do this, you can run
the following command:

```bash
yarn build
```

Afterwards, you should be good to go! For more information about how we handle
dependencies, definitely take a look at our write-up
[here](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/dependencies.md).

## Common tasks

While working on the IBM.com Library, here are some of the top-level tasks that you might
want to run:

| Command                           | Usage                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `yarn build`                      | Uses `lerna` to run the `build` script in each package                                                        |
| `yarn clean`                      | Resets the state of the project by removing all `node_modules` and running the `clean` script in each package |
| `yarn doctoc`                     | Runs `doctoc` on all files in the `doctoc` directory                                                          |
| `yarn format`, `yarn format:diff` | Format files using prettier, check if files have been formatted                                               |
| `yarn reset`                      | Cleans the yarn cache and node_modules folders and brings the project back to a stable state                  |

In addition, you can use `yarn` to run `bin` files using the `yarn <bin>`
syntax. For example, if you wanted to use `lerna` to run a script in every
package you could do the following:

```bash
# Access $(yarn bin)/lerna and pass `run build` to the executable
yarn lerna run build
```

## Developing Locally

There would be instances where in development, testing one of the packages before 
publishing would be required. Creating a symlink to the local package is typically
the best way to approach this, using `yarn link`:

https://yarnpkg.com/lang/en/docs/cli/link/ 

## Submitting a Pull Request

1. Pull the latest master branch from `upstream`:

   ```
   $ git pull upstream master
   ```

2. Always work and submit pull requests from a branch. _Do not submit pull
   requests from the `master` branch of your fork_.

   ```
   $ git checkout -b { YOUR_BRANCH_NAME } master
   ```

3. Create your patch or feature.

4. Test your branch and add new test cases where appropriate.

5. Commit your changes using a descriptive commit message.

   ```
   $ git commit -a -m "chore: Update header with newest designs, resolves #123"
   ```

   **Note:** the optional commit -a command line option will automatically "add"
   and "rm" edited files. See
   [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/)
   and
   [writing good commit messages](https://github.com/erlang/otp/wiki/Writing-good-commit-messages)
   for more details on commit messages.

   IBM.com Library also uses a commit format called
   [Conventional Commits](https://www.conventionalcommits.org). This format is
   used to help automate details about our project and how it changes. When
   committing changes, there will be a tool that automatically looks at commits
   and will check to see if the commit matches the format defined by
   Conventional Commits.

6. Once ready for feedback from other contributors and maintainers, **push your
   commits to your fork** (be sure to run `yarn ci-check` before pushing, to
   make sure your code passes linting and unit tests):

   ```
   $ git push origin { YOUR_BRANCH_NAME }
   ```

7. In Github, navigate to
   [carbon-design-system/ibm-dotcom-library](https://github.com/carbon-design-system/ibm-dotcom-library/)
   and click the button that reads "Compare & pull request".

8. Write a title and description, then click "Create pull request".

   See
   [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
   for more details on writing good PRs.

9. Stay up to date with the activity in your pull request. Maintainers will be
    reviewing your work and making comments, asking questions and suggesting
    changes to be made before they merge your code. When you need to make a
    change, add, commit and push to your branch normally.

    Once all revisions to your pull request are complete, a maintainer will
    squash and merge your commits for you.

## FAQ

#### CI checks are failing saying that it cannot find a dependency in offline mode

Most likely this is due to Yarn mistakenly removing, or forgetting to add, a
dependency to our offline mirror. Typically, running the following set of
commands should reset the project back to a valid state and should bring back
any missing dependencies or fetch new ones.

```bash
yarn cache clean
yarn clean
yarn install
yarn build
```

A shortcut task available from the root also runs the above commands:

```bash
yarn reset
```
