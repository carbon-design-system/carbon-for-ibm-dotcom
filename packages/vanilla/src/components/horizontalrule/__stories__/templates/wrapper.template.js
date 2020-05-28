/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Wrapper template for the storybook story
 *
 * @param {object} props props object
 * @param {string} props.words Example words wrapper
 * @param {string} props.hr HR string to insert
 * @returns {string} Wrapper template literal string
 */
const wrapper = ({ words, hr }) => `
  <div>
    <h1>
      <b>Grid with no Gutter</b>
    </h1>
    <div class="bx--grid" style="margin-bottom: 50px;">
      <div class="bx--row bx--no-gutter">
        <div class="bx--col">
          ${hr}
        </div>
      </div>
    </div>
  
    <h1>
      <b>Grid with Gutter</b>
    </h1>
    <div class="bx--grid bx--grid--full-width">
      <div class="bx--row">
        <div class="bx--col">
          <h4>${words}</h4>
          ${hr}
          <h4>${words}</h4>
        </div>
      </div>
    </div>
  </div>
`;

export default wrapper;
