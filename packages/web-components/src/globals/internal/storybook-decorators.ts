/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';

/**
 * Wraps provided Storybook story in Carbon grid with no columns.
 *
 * @param story Storybook story
 * @returns {TemplateResult}
 */
export const bxGridNoCol = (story) => html`
  <div class="cds--grid c4d-story-padding">
    <div class="cds--row">${story instanceof Function ? story() : story}</div>
  </div>
`;

/**
 * Wraps provided Storybook story in Carbon grid with a single full-width column.
 *
 * @param story Storybook story
 * @returns {TemplateResult}
 */
export const bxGrid16Col = (story) =>
  bxGridNoCol(html` <div class="cds--col-lg-16">${story()}</div> `);

/**
 * Wraps provided Storybook story in Carbon grid with a half-width, centered column.
 *
 * @param story Storybook story
 * @returns {TemplateResult}
 */
export const bxGrid8ColCentered = (story) =>
  bxGridNoCol(
    html` <div class="cds--offset-lg-4 cds--col-lg-8">${story()}</div> `
  );
