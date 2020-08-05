/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const svg2js = require('svgo/lib/svgo/svg2js');
const createSVGResultFromCarbonIcon = require('./svg-result-carbon-icon');

/**
 * @param {object} node The node in SVG2JS result.
 * @returns {object} The first `<svg>` in the given SVG2JS result.
 */
function findRootNode(node) {
  return node.elem === 'svg' ? node : node.content && node.content.find(item => findRootNode(item));
}

/**
 * Converts `attrs` properties in each node, recursively, from `attrName: { value: attrValue }` to `attrName: attrValue`.
 *
 * @param {object} node The node in SVG2JS result.
 * @returns {object} The given node, after the `attrs` property is converted.
 */
function convertAttrs(node) {
  const { attrs, content } = node || {};
  if (!node || (!attrs && !content)) {
    return node;
  }
  const result = {
    ...node,
  };
  if (attrs) {
    result.attrs = Object.keys(attrs).reduce(
      (acc, name) => ({
        ...acc,
        [name]: attrs[name].value,
      }),
      {}
    );
  }
  if (content) {
    result.content = content.map(item => convertAttrs(item));
  }
  return result;
}

/**
 * A WebPack loader to generate `lit-html`'s `SVGResult` from an icon descriptor from `@carbon/icons`.
 */
function svgResultIBMDotcomIconLoader(content) {
  const callback = this.async();
  svg2js(content, result => {
    const { error: message } = result;
    if (message) {
      callback(new Error(message));
    } else {
      const svgNode = findRootNode(result);
      if (!svgNode) {
        callback(new Error(`Wrong SVG2JS result found in: ${this.resourcePath}`));
      } else {
        callback(
          null,
          `
          import { svg } from 'lit-html';
          import spread from 'carbon-web-components/es/globals/directives/spread';
          const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(convertAttrs(svgNode))};
          export default svgResultCarbonIcon;
        `
        );
      }
    }
  });
}

module.exports = svgResultIBMDotcomIconLoader;
