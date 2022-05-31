/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility to parse aspect ratios into width & height values
 *
 * @example
 * import {parseAspectRatio} from '@carbon/ibmdotcom-utilities';
 *
 * const [width, height] = parseAspectRatio('16x9');
 *
 * @param {string} aspectRatioString string in format <integer><separator><integer>
 * @returns {Array} [widthInt, heightInt]
 */

function parseAspectRatio(aspectRatioString) {
  if (typeof aspectRatioString !== 'string') {
    throw new TypeError(
      `parseAspectRatio expected a string but was given a ${typeof aspectRatioString}`
    );
  }

  const parsed = aspectRatioString.split(/[^0-9]{1}/).filter(i => i);

  if (parsed.length !== 2) {
    throw new RangeError(
      `Parsed aspect ratio should have a length of 2, but had ${parsed.length} instead`
    );
  }

  return parsed;
}

export default parseAspectRatio;
