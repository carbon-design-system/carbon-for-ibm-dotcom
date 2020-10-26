/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Global config file. Any configurations for builds should be included in here.
 *
 * @type {{}}
 */
global.config = {
  distPath: 'dist/**/*',
  distCss: 'ibm-dotcom-styles.css',
  distRtlCss: 'ibm-dotcom-styles-rtl.css',
  distCssMin: 'ibm-dotcom-styles.min.css',
  distRtlCssMin: 'ibm-dotcom-styles-rtl.min.css',
  scssEntry: 'scss/ibm-dotcom-styles.scss',
  scssFiles: 'scss/**/*.scss',
};
