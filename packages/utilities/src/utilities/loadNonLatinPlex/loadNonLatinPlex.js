/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * CDN host for plex fonts
 *
 * @type {string}
 * @private
 */
const _host = 'https://1.www.s81c.com/common/carbon/plex';

/**
 * Non-Latin font keys and corresponding entry file/font-family
 *
 * @type {{ar: {entry: string, family: string}, jp: {entry: string, family: string}, kr: {entry: string, family: string}}}
 * @private
 */
const _fonts = {
  ar: {
    entry: 'sans-arabic',
    family: 'IBM Plex Sans Arabic',
  },
  ja: {
    entry: 'sans-jp',
    family: 'IBM Plex Sans JP',
  },
  ko: {
    entry: 'sans-kr',
    family: 'IBM Plex Sans KR',
  },
};

/**
 * Non-Latin font-weights and corresponding names
 *
 * @type {{'100': string, '200': string, '300': string, '400': string, '500': string, '600': string, '700': string, '450': string}}
 * @private
 */
const _weights = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'regular',
  450: 'text',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
};

/**
 * Injects the corresponding CSS entry point to the page
 *
 * @param {string} language two-character language code
 * @param {Array} [weights=[]] Array of specific weights to load
 * @private
 */
function _injectCSS(language, weights = []) {
  if (weights.length === 0) {
    const link = document.createElement('link');
    link.href = `${_host}/${_fonts[language].entry}.css`;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName('head')[0].appendChild(link);
  } else {
    weights.forEach((weight) => {
      const linkWeight = document.createElement('link');
      linkWeight.href = `${_host}/${_fonts[language].entry}-${_weights[weight]}.css`;
      linkWeight.type = 'text/css';
      linkWeight.rel = 'stylesheet';
      linkWeight.media = 'screen,print';

      document.getElementsByTagName('head')[0].appendChild(linkWeight);
    });
  }
}

/**
 * Sets the language's font-family to the page
 *
 * @param {string} language two-character language code
 * @private
 */
function _setFontFamily(language) {
  document.body.style.fontFamily = `${_fonts[language].family},IBM Plex Sans,Helvetica Neue,Arial,sans-serif`;
}

/**
 * Utility to load in the corresponding non-Latin Plex font if necessary
 *
 * @example
 * import { loadNonLatinPlex } from '@carbon/ibmdotcom-utilities';
 *
 * loadNonLatinPlex('ar');
 *
 * // Load specific weights only
 * loadNonLatinPlex('ar', [400,600]);
 * @param {string} language two-character language code
 * @param {Array} [weights=[]] Array of specific weights to load (100-700)
 */
function loadNonLatinPlex(language, weights = []) {
  if (_fonts[language]) {
    _injectCSS(language, weights);
    _setFontFamily(language);
  }
}

export default loadNonLatinPlex;
