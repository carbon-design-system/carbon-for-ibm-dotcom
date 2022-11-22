/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import { QUOTE_TYPES, QUOTE_COLOR_SCHEMES } from '../quote';
import '../index';
import '../quote-link-with-icon';
import textNullable from '../../../../.storybook/knob-text-nullable';

import readme from './README.stories.mdx';

export const Default = (args) => {
  const {
    copy,
    quoteMark,
    sourceHeading,
    sourceCopy,
    sourceBottomCopy,
    colorScheme,
  } = args?.Quote ?? {};
  return html`
    <dds-quote color-scheme="${colorScheme}" mark-type="${quoteMark}">
      ${copy}
      <dds-quote-source-heading> ${sourceHeading} </dds-quote-source-heading>
      <dds-quote-source-copy> ${sourceCopy} </dds-quote-source-copy>
      <dds-quote-source-bottom-copy>
        ${sourceBottomCopy}
      </dds-quote-source-bottom-copy>
      <dds-quote-link-with-icon slot="footer" href="https://example.com">
        Link with Icon ${ArrowRight20({ slot: 'icon' })}
      </dds-quote-link-with-icon>
    </dds-quote>
  `;
};

const types = {
  [`${QUOTE_TYPES.DEFAULT}`]: QUOTE_TYPES.DEFAULT,
  [`${QUOTE_TYPES.SINGLE_CURVED}`]: QUOTE_TYPES.SINGLE_CURVED,
  [`${QUOTE_TYPES.DOUBLE_ANGLE}`]: QUOTE_TYPES.DOUBLE_ANGLE,
  [`${QUOTE_TYPES.SINGLE_ANGLE}`]: QUOTE_TYPES.SINGLE_ANGLE,
  [`${QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED}`]:
    QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED,
  [`${QUOTE_TYPES.CORNER_BRACKET}`]: QUOTE_TYPES.CORNER_BRACKET,
};

const colorSchemes = {
  [`${QUOTE_COLOR_SCHEMES.REGULAR}`]: QUOTE_COLOR_SCHEMES.REGULAR,
  [`${QUOTE_COLOR_SCHEMES.INVERSE}`]: QUOTE_COLOR_SCHEMES.INVERSE,
};

export default {
  title: 'Components/Quote',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-11">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Quote: () => ({
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
        colorScheme: select(
          'Color Scheme (color-scheme)',
          colorSchemes,
          colorSchemes.regular
        ),
      }),
    },
    propsSet: {
      default: {
        Quote: {
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          quoteMark: 'double-curved',
          sourceHeading: 'Lorem ipsum dolor sit amet',
          sourceCopy: 'consectetur adipiscing elit',
          sourceBottomCopy: 'IBM Cloud',
          colorScheme: 'regular',
        },
      },
    },
  },
};
