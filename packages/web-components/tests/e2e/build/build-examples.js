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

program
  .option('-C, --skip-clean', 'Skips cleaning build folders')
  .option('-P, --skip-packages', 'Skips the local package setup')
  .option('-E, --skip-examples', 'Skips the local examples setup');
program.parse();

/**
 * Command line options
 *
 * @type {commander.OptionValues}
 */
const _opts = program.opts();

const { log, error } = console;

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
const _localPackagesFolder = path.resolve(__dirname, '../packages/');

/**
 * Examples build folder
 *
 * @type {string}
 * @private
 */
const _exampleBuild = path.resolve(__dirname, '../examples');

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
        `cd ${_packages[pack]} && yarn pack --filename ${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz`,
        `tar xzf ${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz --directory ${_localPackagesFolder}`,
        `mv ${_localPackagesFolder}/package ${_localPackagesFolder}/ibmdotcom-${pack}`,
        `node replace-dependencies.js ${_localPackagesFolder}/ibmdotcom-${pack}/package.json`
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
 * @param {string} example Name of example folder to build
 * @private
 */
function _buildExample(example) {
  log(chalk.green(`Building example: ${example}`));

  const exampleFolder = `${_exampleBuild}/${example}`;
  execSync(`cd ${exampleFolder} && yarn && yarn build`);
  execSync(`mv ${exampleFolder}/dist ${_distFolder}/${example}`);
}

/**
 * Cleans all of the build folders
 *
 * @private
 */
function _clean() {
  if (!_opts.skipClean) {
    // Delete the packages folder and create a new one
    if (fs.existsSync(_localPackagesFolder)) {
      log(chalk.yellow(`Deleting local packages folder: ${_localPackagesFolder}`));
      fs.rmdirSync(_localPackagesFolder, { recursive: true });
    }
    fs.mkdirSync(_localPackagesFolder);

    // Delete the examples staging folder
    if (fs.existsSync(_exampleBuild)) {
      log(chalk.yellow(`Deleting examples staging folder: ${_exampleBuild}`));
      fs.rmdirSync(_exampleBuild, { recursive: true });
    }
    fs.mkdirSync(_exampleBuild);

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
    fs.copySync(_exampleSrc, _exampleBuild);
  }
}

/**
 * Building the examples
 */
function build() {
  _clean();
  _setupPackages();
  _copyExamples();

  const examples = _getDirectories(_exampleBuild);

  examples.forEach(example => {
    // temporary, will need to flatten the folders in there
    if (example !== 'cta') {
      log(chalk.green(`Replacing dependencies for ${example}`));
      execSync(`node replace-dependencies.js ${_exampleBuild}/${example}/package.json`);
      _buildExample(example);
    }
  });
}

build();
