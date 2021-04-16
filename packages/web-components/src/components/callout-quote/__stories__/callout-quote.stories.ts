/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import '../callout-quote';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { QUOTE_TYPES } from '../../quote/quote';
import '../../quote/quote-source-bottom-copy';
import '../../quote/quote-source-copy';
import '../../quote/quote-source-heading';
import '../callout-link-with-icon';
import readme from './README.stories.mdx';

const types = {
  [`${QUOTE_TYPES.DEFAULT}`]: QUOTE_TYPES.DEFAULT,
  [`${QUOTE_TYPES.SINGLE_CURVED}`]: QUOTE_TYPES.SINGLE_CURVED,
  [`${QUOTE_TYPES.DOUBLE_ANGLE}`]: QUOTE_TYPES.DOUBLE_ANGLE,
  [`${QUOTE_TYPES.SINGLE_ANGLE}`]: QUOTE_TYPES.SINGLE_ANGLE,
  [`${QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED}`]: QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED,
  [`${QUOTE_TYPES.CORNER_BRACKET}`]: QUOTE_TYPES.CORNER_BRACKET,
};

export const Default = ({ parameters }) => {
  const { copy, quoteMark, sourceHeading, sourceCopy, sourceBottomCopy } = parameters?.props?.CalloutQuote ?? {};
  return html`
    <dds-callout-quote mark-type="${quoteMark}">
      ${copy}
      <dds-quote-source-heading>
        ${sourceHeading}
      </dds-quote-source-heading>
      <dds-quote-source-copy>
        ${sourceCopy}
      </dds-quote-source-copy>
      <dds-quote-source-bottom-copy>
        ${sourceBottomCopy}
      </dds-quote-source-bottom-copy>
      <dds-callout-link-with-icon slot="footer" href="https://example.com">
        Link with icon ${ArrowRight20({ slot: 'icon' })}
      </dds-callout-link-with-icon>
    </dds-callout-quote>
  `;
};

export default {
  title: 'Components/Callout quote',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      CalloutQuote: ({ groupId }) => ({
        copy: textNullable(
          'Quote (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          groupId
        ),
        quoteMark: select('Quote Mark (markType):', types, types.doubleCurved, groupId),
        sourceHeading: textNullable('Source heading (source-heading slot)', 'Lorem ipsum dolor sit amet', groupId),
        sourceCopy: textNullable('Source copy (source-copy slot)', 'consectetur adipiscing elit', groupId),
        sourceBottomCopy: textNullable('Source bottom copy (source-bottom-copy slot)', 'IBM Cloud', groupId),
      }),
    },
    decorators: [
      story => html`
        <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
          <div class="bx--row">
            <div class="bx--offset-lg-4 bx--col-lg-12">
              ${story()}
            </div>
          </div>
        </div>
      `,
    ],
  },
};
