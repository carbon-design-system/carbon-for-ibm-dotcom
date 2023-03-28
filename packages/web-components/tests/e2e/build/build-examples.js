/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const execa = require('execa');
const chalk = require('chalk');
const program = require('commander');
const { mkdirSync, track } = require('temp');

program
  .option('-C, --skip-clean', 'Skips cleaning build folders')
  .option('-P, --skip-packages', 'Skips the local package setup')
  .option('-D, --skip-dist', 'Skips the local dist components build')
  .option('-E, --skip-examples', 'Skips the local examples setup');
program.parse();

/**
 * Command line options
 *
 * @type {program.OptionValues}
 */
const _opts = program.opts();

const { log } = console;

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
  'web-components': path.resolve(__dirname, '../../../../web-components'),
};

/**
 * Use older version of Yarn for example builds.
 * Later versions would require changes to every example's package.json file.
 *
 * @type {string}
 * @private
 */
const _oldYarnVersion = '1.22.19';

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
  return fsExtra
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
  const execOptions = { stdio: 'inherit', shell: true };

  if (!_opts.skipPackages) {
    log(chalk.yellow('Creating local packages...'));

    Object.keys(_packages).forEach(pack => {
      log(chalk.green(`Building package: ${pack}`));
      // Use execa to avoid the maxBuffer limitation of execSync - web components.tgz file size too large
      execa.commandSync(`cd ${_packages[pack]} && yarn pack --filename ${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz`, execOptions);
      execa.commandSync(`tar xzf ${_localPackagesFolder}/carbon-ibmdotcom-${pack}.tar.gz --directory ${_localPackagesFolder}`, execOptions);
      execa.commandSync(`mv ${_localPackagesFolder}/package ${_localPackagesFolder}/ibmdotcom-${pack}`, execOptions);
      execa.commandSync(`node ${_testScriptFolder}/replace-dependencies.js -f ${_localPackagesFolder} ${_localPackagesFolder}/ibmdotcom-${pack}/package.json`, execOptions);
    });
  }
}

/**
 * Copies the CDN folder to the web test folder
 *
 * @private
 */
function _copyCDN() {
  log(chalk.yellow('Copying CDN packages to the web folder...'));
  execSync(`mkdir "${_distFolder}/cdn"`);
  execSync(`cp -a "${_projectRoot}/dist/." "${_distFolder}/cdn"`);
}

/**
 * Builds the CDN artifacts
 *
 * @private
 */
function _buildDist() {
  if (!_opts.skipDist) {
    log(chalk.yellow('Building CDN artifacts...'));

    execSync('yarn build:components', {
      cwd: _projectRoot,
      stdio: 'inherit',
    });

    execSync('yarn build:sass:cdn', {
      cwd: _projectRoot,
      stdio: 'inherit',
    });
  }
}

/**
 * Builds then copies the dist folder to the final location
 *
 * @private
 */
function _buildExamples() {
  // Use older Yarn version for example builds.
  // Setting the version earlier in the build chain will alter the root project.
  log(chalk.yellow('Installing all examples...'));
  // need to install twice for some reason, need to look into this
  execSync(`yarn set version ${_oldYarnVersion} && yarn install --network-timeout 100000`, {
    cwd: _exampleBuild,
    stdio: 'inherit',
  });

  execSync(`yarn set version ${_oldYarnVersion} && yarn cache clean && yarn install --network-timeout 100000`, {
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

    // replace the CDN artifact before it's moved
    const cdnFile = `${_exampleBuild}/components/${example}/dist/cdn.html`;
    const contents = fs.readFileSync(cdnFile, 'utf8');
    const contentsFinal = contents.replace(
      /https:\/\/1\.www\.s81c\.com\/common\/carbon-for-ibm-dotcom\/tag\/v1\/latest\//g,
      '../cdn/'
    );
    fs.writeFileSync(cdnFile, contentsFinal);

    // replace the CDN RTL version if it exists
    const cdnRtlFile = `${_exampleBuild}/components/${example}/dist/cdn-rtl.html`;
    if (fs.existsSync(cdnRtlFile)) {
      const contentsRTL = fs.readFileSync(cdnRtlFile, 'utf8');
      const contentsRTLFinal = contentsRTL.replace(
        /https:\/\/1\.www\.s81c\.com\/common\/carbon-for-ibm-dotcom\/tag\/v1\/latest\//g,
        '../cdn/'
      );
      fs.writeFileSync(cdnRtlFile, contentsRTLFinal);
    }

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
    if (fsExtra.existsSync(_distFolder)) {
      log(chalk.yellow(`Deleting dist folder: ${_distFolder}`));
      fsExtra.rm(_distFolder, { recursive: true });
    }
    fsExtra.mkdirSync(_distFolder);
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
    fsExtra.mkdirSync(`${_exampleBuild}/components`);
    fsExtra.copySync(`${_testScriptFolder}/examples-scaffold`, `${_exampleBuild}`);
    fsExtra.copySync(_exampleSrc, `${_exampleBuild}/components`);
    _examples = _getDirectories(`${_exampleBuild}/components`);
  }
}

/**
 * Creates the index file for the deploy preview
 *
 * @private
 */
function _createIndex() {
  log(chalk.yellow('Creating index file...'));

  // eslint-disable-next-line max-len
  let content = `<html><head><link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css" /></head><body style="padding: 2rem;"><ul>`;

  _examples.forEach(example => {
    content += `
<li>
    <strong>${example}:</strong>
    <a href="./${example}/index.html">ES version</a> |
    <a href="./${example}/cdn.html">CDN version</a>
</li>`;
  });

  content += '</ul></body></html>';

  // Writing to dist
  fs.writeFileSync(`${_distFolder}/index.html`, content);
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

  // Create the dynamic index root file
  _createIndex();

  // Builds the CDN artifacts
  _buildDist();

  // Copies the local CDN packages to the web test folder
  _copyCDN();

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
