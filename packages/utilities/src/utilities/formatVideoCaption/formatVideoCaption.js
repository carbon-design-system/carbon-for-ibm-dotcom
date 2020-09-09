/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The default g11n formatter for video caption, combining video name and video duration.
 * Components using this function should have a mechanism to allow translators
 * to replace it with one accomodating the preferences of specific locale.
 *
 * @param {object} [options] The options, with a video name and a formatted video duration.
 * @param {string} [options.duration] The video duration.
 * @param {string} [options.name] The video name.
 * @returns {string} The formatted video caption.
 */
export function formatVideoCaption({ duration, name } = {}) {
  return !name || (duration !== 0 && !duration)
    ? name || duration || ''
    : `${name} (${duration})`;
}

/**
 * The default g11n formatter for video duration.
 * Components using this function should have a mechanism to allow translators
 * to replace it with one accomodating the preferences of specific locale,
 * or to replace it with general-purpose g11n formatting library.
 * (e.g. moment, though it's too big for us to make it a hard dependency)
 *
 * @param {object} [options] The options, with a video duration.
 * @param {number} [options.duration] The video duration, in seconds.
 * @returns {string} The formatted video duration.
 */
export function formatVideoDuration({ duration } = {}) {
  const minutes = Math.floor((duration ?? 0) / 60000);
  const seconds = Math.floor(((duration ?? 0) / 1000) % 60);
  const fillSeconds = Array.from({
    length: 2 - String(seconds).length + 1,
  }).join('0');
  return duration == null ? duration : `${minutes}:${fillSeconds}${seconds}`;
}
