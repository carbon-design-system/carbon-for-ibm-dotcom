/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const defaultOpts = { delimeter: '_' };

/**
 * Storybook doesn't handle empty strings (i.e. '') well in Control configuration.
 * Instead, we replace empty strings in enums with this blank space.
 */
const STORYBOOK_EMPTY_STRING = ' ';

/**
 * Capitalizes a word.
 *
 * @param {string} word The word to capitalize.
 * @returns {string} The capitalized word.
 */
const capitalize = (word: string) =>
  `${word.slice(0, 1).toUpperCase()}${word
    .slice(1, word.length)
    .toLowerCase()}`;

/**
 * Formats an enum key as a user-friendly label for use in Storybook.
 *
 * @param {string} key The enum key.
 * @param {object} opts Optional configuration.
 * @param {string} opts.delimeter The character to split on.
 * @returns {string} The formatted version of the provided key.
 */
export const formatEnumKey = (key, opts = defaultOpts) =>
  key
    .split(opts.delimeter)
    .map((word) => capitalize(word))
    .join(' ');

/**
 * Conversts a TypeScript enum into an array.
 *
 * @param en The enum to convert.
 * @returns {Array} An array containing the enum's values.
 */
export const enumValsToArray = (en) =>
  Object.keys(en)
    .filter((key) => typeof key === 'string')
    .map((key) => en[key] || STORYBOOK_EMPTY_STRING);

/**
 * Converts a TypeScript enum's keys into an array of formatted labels.
 *
 * @param en The enum to convert.
 * @param {object} opts Optional configuration.
 * @param {string} opts.delimeter The character to split on.
 * @returns {Array} An array containing formatted versions of the enum's keys.
 */
export const enumKeysToArray = (en, opts = defaultOpts) =>
  Object.keys(en)
    .filter((key) => typeof key === 'string')
    .map((key) => formatEnumKey(key, opts));

/**
 * Converts an enum into a Storybook-friendly labels object.
 *
 * @param en The enum to convert.
 * @param {object} opts Optional configuration.
 * @param {string} opts.delimeter The character to split on.
 * @returns {object} An object for use in Storybook Control label config.
 */
export const enumToLabels = (en, opts = defaultOpts) => {
  const options = {};
  Object.keys(en)
    .filter((key) => typeof key === 'string')
    .forEach((key) => {
      const value = en[key];
      const keyFormatted = formatEnumKey(key, opts);
      options[`${value || STORYBOOK_EMPTY_STRING}`] = `${keyFormatted}${
        value && ` (${value})`
      }`;
    });

  return options;
};
