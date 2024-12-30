/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Meta } from '@storybook/web-components';
import '../index';
import '../callout-link-with-icon';
import { html } from 'lit';
import { QUOTE_TYPES } from '../../quote/quote';
import { COLOR_SCHEME } from '../../../component-mixins/callout/defs';
import storyDocs from './callout-quote.mdx';

const quoteTypes = {
  [`${QUOTE_TYPES.DEFAULT}`]: QUOTE_TYPES.DEFAULT,
  [`${QUOTE_TYPES.SINGLE_CURVED}`]: QUOTE_TYPES.SINGLE_CURVED,
  [`${QUOTE_TYPES.DOUBLE_ANGLE}`]: QUOTE_TYPES.DOUBLE_ANGLE,
  [`${QUOTE_TYPES.SINGLE_ANGLE}`]: QUOTE_TYPES.SINGLE_ANGLE,
  [`${QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED}`]:
    QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED,
  [`${QUOTE_TYPES.CORNER_BRACKET}`]: QUOTE_TYPES.CORNER_BRACKET,
};

const colorSchemeTypes = {
  [`${COLOR_SCHEME.REGULAR}`]: COLOR_SCHEME.REGULAR,
  [`${COLOR_SCHEME.INVERSE}`]: COLOR_SCHEME.INVERSE,
  [`${COLOR_SCHEME.LAYER}`]: COLOR_SCHEME.LAYER,
  [`${COLOR_SCHEME.PURPLE}`]: COLOR_SCHEME.PURPLE,
  [`${COLOR_SCHEME.CYAN}`]: COLOR_SCHEME.CYAN,
};

const args = {
  copy:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
    'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
  quoteMark: quoteTypes['double-curved'],
  sourceHeading: 'Lorem ipsum dolor sit amet',
  sourceCopy: 'consectetur adipiscing elit',
  sourceBottomCopy: 'IBM Cloud',
  colorScheme: COLOR_SCHEME.REGULAR,
};

const argTypes = {
  copy: {
    control: 'text',
    description: 'Quote (copy)',
  },
  quoteMark: {
    control: 'select',
    description: 'Quote Mark (markType)',
    options: quoteTypes,
  },
  sourceHeading: {
    control: 'text',
    description: 'Source heading (source-heading slot)',
  },
  sourceCopy: {
    control: 'text',
    description: 'Source copy (source-copy slot)',
  },
  sourceBottomCopy: {
    control: 'text',
    description: 'Source bottom copy (source-bottom-copy slot)',
  },
  colorScheme: {
    control: 'select',
    description: 'Color scheme',
    options: colorSchemeTypes,
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    copy,
    quoteMark,
    sourceHeading,
    sourceCopy,
    sourceBottomCopy,
    colorScheme,
  }) => {
    return html`
      <c4d-callout-quote mark-type="${quoteMark}" color-scheme="${colorScheme}">
        ${copy}
        <c4d-quote-source-heading> ${sourceHeading} </c4d-quote-source-heading>
        <c4d-quote-source-copy> ${sourceCopy} </c4d-quote-source-copy>
        <c4d-quote-source-bottom-copy>
          ${sourceBottomCopy}
        </c4d-quote-source-bottom-copy>
        <c4d-callout-link-with-icon
          slot="footer"
          href="https://example.com"
          cta-type="local">
          Link with icon
        </c4d-callout-link-with-icon>
      </c4d-callout-quote>
    `;
  },
};

const meta: Meta = {
  title: 'Components/Callout quote',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    hasStoryPadding: true,
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
