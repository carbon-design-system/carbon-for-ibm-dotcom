#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const program = require('commander');

program.option('-f, --folder <folder>', 'Location of packages folder');
program.parse();

/**
 * Command line options
 *
 * @type {program.OptionValues}
 */
const _opts = program.opts();

/**
 * Files passed into the command
 *
 * @type {string[]}
 */
const _files = program.args;

/**
 * Dependency targets
 *
 * @type {string[]}
 */
const deps = ['dependencies', 'peerDependencies', 'devDependencies'];

/**
 * Defined packages
 *
 * @type {string[]}
 */
const packs = [
  '@carbon/ibmdotcom-services',
  '@carbon/ibmdotcom-styles',
  '@carbon/ibmdotcom-utilities',
  '@carbon/ibmdotcom-react',
  '@carbon/ibmdotcom-web-components',
];

/**
 * Replaces `@carbon/ibmdotcom-*` dependencies in the given `package.json` files with the local directory references.
 *
 * @param {string[]} files The files.
 */
const replace = files => {
  const { folder } = _opts;

  files.forEach(file => {
    const contents = JSON.parse(fs.readFileSync(file));
    deps.forEach(dep => {
      const item = contents[dep];
      if (item) {
        packs.forEach(pack => {
          if (item[pack]) {
            item[pack] = `file:${folder}/${pack.replace(/^@carbon\//, '')}`;
          }
        });
      }
    });

    fs.writeFileSync(file, JSON.stringify(contents, null, 2));
  });
};

replace(_files);
