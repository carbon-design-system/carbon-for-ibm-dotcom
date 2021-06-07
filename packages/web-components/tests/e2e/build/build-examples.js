/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const program = require('commander');
const { mkdirSync, track } = require('temp');

program
  .option('-C, --skip-clean', 'Skips cleaning build folders')
  .option('-P, --skip-packages', 'Skips the local package setup')
  .option('-E, --skip-examples', 'Skips the local examples setup');
program.parse();

/**
 * Command line options
 *
 * @type {program.OptionValues}
 */
const _opts = program.opts();

const { log, error } = console;

/**
 * Project root folder
 *
 * @type {string}
 * @private
 */
const _projectRoot = path.resolve(__dirname, '../../..');

/**
 * Test script folder
 *
 * @type {string}
 * @private
 */
const _testScriptFolder = `${_projectRoot}/tests/e2e/build`;

/**
 * Examples source folder
 *
 * @type {string}
 * @private
 */
const _exampleSrc = path.resolve(__dirname, '../../../examples/codesandbox/components');

/**
 * Local packages for the examples
 *
 * @type {string}
 * @private
 */
const _localPackagesFolder = mkdirSync('temp-packages-');

/**
 * Examples build folder
 *
 * @type {string}
 * @private
 */
const _exampleBuild = mkdirSync('temp-examples-');

/**
 * Distribution folder
 *
 * @type {string}
 * @private
 */
const _distFolder = path.resolve(__dirname, '../dist/');

/**
 * Defines the local packs to build
 *
 * @type {{styles: string, services: string, utilities: string, 'web-components': string}}
 * @private
 */
const _packages = {
  services: path.resolve(__dirname, '../../../../services'),
  styles: path.resolve(__dirname, '../../../../styles'),
  utilities: path.resolve(__dirname, '../../../../utilities'),
  'web-components': path.resolve(__dirname, '../../..'),
};

/**
 * Stores the list of examples
 *
 * @type {*[]}
 * @private
 */
let _examples = [];

/**
 * Gets the list of directories in the examples folder
 *
 * @param {string} folder Folder to get the list of sub directories from
 * @returns {*} Array of folders
 * @private
 */
function _getDirectories(folder) {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Puts the build artifacts in the given temporary directory
 * and resolves dependencies in `package.json` to use such build artifacts.
 *
 * @private
 */
function _setupPackages() {
  if (!_opts.skipPackages) {
    log(chalk.yellow('Creating local packages...'));

    Object.keys(_packages).forEach(pack => {
      log(chalk.green(`Building package: ${pack}`));

      const commands = [];
      commands.push(
        `cd "${_packages[pack]}" && yarn pack --filename "${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz"`,
        `tar xzf "${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz" --directory "${_localPackagesFolder}"`,
        `mv "${_localPackagesFolder}/package" "${_localPackagesFolder}/ibmdotcom-${pack}"`,
        // eslint-disable-next-line max-len
        `node "${_testScriptFolder}/replace-dependencies.js" -f "${_localPackagesFolder}" "${_localPackagesFolder}/ibmdotcom-${pack}/package.json"`
      );

      commands.forEach(command => {
        const { stdout, stderr } = execSync(command);
        if (stdout) {
          log(stdout.toString());
        }
        if (stderr) {
          error(stderr.toString());
        }
      });
    });
  }
}

/**
 * Builds then copies the dist folder to the final location
 *
 * @private
 */
function _buildExamples() {
  log(chalk.yellow('Installing all examples...'));
  // need to install twice for some reason, need to look into this
  execSync('yarn install', {
    cwd: _exampleBuild,
    stdio: 'inherit',
  });

  execSync('yarn cache clean && yarn install', {
    cwd: _exampleBuild,
    stdio: 'inherit',
  });

  log(chalk.yellow('Building all examples...'));
  _examples.forEach(example => {
    log(chalk.green(`Building ${example}...`));
    execSync('yarn build', {
      cwd: `${_exampleBuild}/components/${example}`,
      stdio: 'inherit',
    });

    // Copying dist output
    log(chalk.green(`Copying ${example} to dist...`));
    execSync(`mv "${_exampleBuild}/components/${example}/dist" "${_distFolder}/${example}"`);
  });
}

/**
 * Cleans all of the build folders
 *
 * @private
 */
function _clean() {
  if (!_opts.skipClean) {
    // cleans the temporary folders
    track();

    // Delete the dist folder
    if (fs.existsSync(_distFolder)) {
      log(chalk.yellow(`Deleting dist folder: ${_distFolder}`));
      fs.rmdirSync(_distFolder, { recursive: true });
    }
    fs.mkdirSync(_distFolder);
  }
}

/**
 * Copies the source examples to the local examples folder for building
 *
 * @private
 */
function _copyExamples() {
  if (!_opts.skipExamples) {
    log(chalk.yellow('Copying examples folder...'));
    fs.mkdirSync(`${_exampleBuild}/components`);
    fs.copySync(`${_testScriptFolder}/examples-scaffold`, `${_exampleBuild}`);
    fs.copySync(_exampleSrc, `${_exampleBuild}/components`);
    _examples = _getDirectories(`${_exampleBuild}/components`);
  }
}

/**
 * Building the examples
 */
function build() {
  _clean();

  log(chalk.yellow(`Temporary packages directory created: ${_localPackagesFolder}`));
  _setupPackages();

  log(chalk.yellow(`Temporary examples directory created: ${_exampleBuild}`));
  _copyExamples();

  _examples.forEach(example => {
    log(chalk.green(`Replacing dependencies for ${example} and installing`));
    execSync(
      // eslint-disable-next-line max-len
      `node "${_testScriptFolder}/replace-dependencies.js" -f "${_localPackagesFolder}" "${_exampleBuild}/components/${example}/package.json"`
    );
  });

  _buildExamples();
}

build();
