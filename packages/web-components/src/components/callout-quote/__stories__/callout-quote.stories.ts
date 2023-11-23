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
import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import { QUOTE_TYPES } from '../../quote/quote';
import { COLOR_SCHEME } from '../../../component-mixins/callout/defs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

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

export const Default = (args) => {
  const {
    copy,
    quoteMark,
    sourceHeading,
    sourceCopy,
    sourceBottomCopy,
    colorScheme,
  } = args?.CalloutQuote ?? {};
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
};

export default {
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
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CalloutQuote: () => ({
        copy: textNullable(
          'Quote (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.'
        ),
        quoteMark: select(
          'Quote Mark (markType):',
          quoteTypes,
          quoteTypes['double-curved']
        ),
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
        colorScheme: select(
          'Color scheme:',
          colorSchemeTypes,
          COLOR_SCHEME.REGULAR
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
