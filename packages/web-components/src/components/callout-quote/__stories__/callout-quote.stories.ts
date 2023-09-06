/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../callout-link-with-icon';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import { QUOTE_TYPES } from '../../quote/quote';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const types = {
  [`${QUOTE_TYPES.DEFAULT}`]: QUOTE_TYPES.DEFAULT,
  [`${QUOTE_TYPES.SINGLE_CURVED}`]: QUOTE_TYPES.SINGLE_CURVED,
  [`${QUOTE_TYPES.DOUBLE_ANGLE}`]: QUOTE_TYPES.DOUBLE_ANGLE,
  [`${QUOTE_TYPES.SINGLE_ANGLE}`]: QUOTE_TYPES.SINGLE_ANGLE,
  [`${QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED}`]:
    QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED,
  [`${QUOTE_TYPES.CORNER_BRACKET}`]: QUOTE_TYPES.CORNER_BRACKET,
};

export const Default = (args) => {
  const { copy, quoteMark, sourceHeading, sourceCopy, sourceBottomCopy } =
    args?.CalloutQuote ?? {};
  return html`
    <c4d-callout-quote mark-type="${quoteMark}">
      ${copy}
      <c4d-quote-source-heading> ${sourceHeading} </c4d-quote-source-heading>
      <c4d-quote-source-copy> ${sourceCopy} </c4d-quote-source-copy>
      <c4d-quote-source-bottom-copy>
        ${sourceBottomCopy}
      </c4d-quote-source-bottom-copy>
      <c4d-callout-link-with-icon slot="footer" href="https://example.com">
        Link with icon ${ArrowRight20({ slot: 'icon' })}
      </c4d-callout-link-with-icon>
    </c4d-callout-quote>
  `;
};

export default {
  title: 'Components/Callout quote',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-11">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CalloutQuote: () => ({
        copy: textNullable(
          'Quote (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.'
        ),
        quoteMark: select('Quote Mark (markType):', types, types.doubleCurved),
        sourceHeading: textNullable(
          'Source heading (source-heading slot)',
          'Lorem ipsum dolor sit amet'
        ),
        sourceCopy: textNullable(
          'Source copy (source-copy slot)',
          'consectetur adipiscing elit'
        ),
        sourceBottomCopy: textNullable(
          'Source bottom copy (source-bottom-copy slot)',
          'IBM Cloud'
        ),
      }),
    },
    propsSet: {
      default: {
        CalloutQuote: {
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          quoteMark: 'double-curved',
          sourceHeading: 'Lorem ipsum dolor sit amet',
          sourceCopy: 'consectetur adipiscing elit',
          sourceButtonCopy: 'IBM Cloud',
        },
      },
    },
  },
};
