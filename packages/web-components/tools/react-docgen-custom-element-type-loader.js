/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * A WebPack loader that adds a pseudo React component for React DocGen.
 *
 * @returns {string} The massaged module content.
 */
function reactDocgenCustomElementTypeLoader(fileContent) {
  return `
    import { Component as ReactComponent } from 'react';
    ${fileContent}
    export class PropTypesRef extends ReactComponent {
      render() {}
    }
    PropTypesRef.propTypes = propTypes;
  `;
}

module.exports = reactDocgenCustomElementTypeLoader;
