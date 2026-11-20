/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing } from 'lit';
import '@carbon/web-components/es/components/tag/index.js';
import styles from './type-styles.stories.scss';

// Keep these lists in sync with `packages/styles/scss/globals/_tokens.scss`
// and the `$tokens` map in `packages/styles/scss/globals/_type.scss`.

/**
 * All C4D type tokens, in alphabetical order (same order as the CDS preview below).
 * https://carbon-elements.netlify.app/type/examples/preview/#type-styles
 */
const tokens = [
  'body-01',
  'body-02',
  'body-compact-01',
  'body-compact-02',
  'code-01',
  'code-02',
  'fluid-body-03',
  'fluid-display-01',
  'fluid-display-02',
  'fluid-display-03',
  'fluid-display-04',
  'fluid-heading-03',
  'fluid-heading-04',
  'fluid-heading-05',
  'fluid-heading-06',
  'fluid-paragraph-01',
  'fluid-quotation-01',
  'fluid-quotation-02',
  'fluid-statistic',
  'heading-01',
  'heading-02',
  'heading-03',
  'heading-03-semibold',
  'heading-04',
  'heading-05',
  'heading-06',
  'heading-07',
  'heading-compact-01',
  'heading-compact-02',
  'helper-text-01',
  'helper-text-02',
  'label-01',
  'label-02',
  'legal-01',
  'legal-02',
];

/**
 * CDS tokens that C4D overrides.
 */
const customizedTokens = [
  'heading-04',
  'fluid-heading-03',
  'fluid-heading-04',
  'fluid-heading-05',
  'fluid-quotation-02',
];

/**
 * Tokens that exist only in C4D.
 */
const uniqueTokens = [
  'fluid-body-03',
  'fluid-statistic',
  'heading-03-semibold',
];

const getType = (token: string) => {
  if (customizedTokens.includes(token)) {
    return { label: 'Custom', type: 'purple' };
  }
  if (uniqueTokens.includes(token)) {
    return { label: 'Unique', type: 'green' };
  }
  return undefined;
};

const isC4DToken = (token: string) =>
  customizedTokens.includes(token) || uniqueTokens.includes(token);

/**
 * Table 1: customized and unique C4D tokens, in alphabetical order.
 */
const c4dTokens = tokens.filter(isC4DToken);

/**
 * Table 2: unmodified core Carbon tokens, in alphabetical order.
 */
const carbonTokens = tokens.filter((token) => !isC4DToken(token));

const renderTable = (tableTokens: string[], showType = true) => html`
  <table class="c4d-type-preview">
    <thead>
      <tr>
        <th scope="col">Token</th>
        ${showType ? html`<th scope="col">Type</th>` : nothing}
        <th scope="col">Sample</th>
      </tr>
    </thead>
    <tbody>
      ${tableTokens.map((token) => {
        const tag = showType ? getType(token) : undefined;
        return html`
          <tr>
            <td class="c4d-type-preview__token">
              <code>${token}</code>
            </td>
            ${tag
              ? html`
                  <td class="c4d-type-preview__type">
                    <cds-tag type="${tag.type}">${tag.label}</cds-tag>
                  </td>
                `
              : nothing}
            <td>
              <p class="c4d-type-preview__sample c4d-type-preview--${token}">
                The quick brown fox jumps over the lazy dog
              </p>
            </td>
          </tr>
        `;
      })}
    </tbody>
  </table>
`;

export const C4DTypeStyles = () => html`
  <style>
    ${styles}
  </style>
  ${renderTable(c4dTokens)}
`;

export const CarbonTypeStyles = () => html`
  <style>
    ${styles}
  </style>
  ${renderTable(carbonTokens, false)}
`;
