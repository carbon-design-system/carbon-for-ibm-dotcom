/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { select } from '@storybook/addon-knobs';
import { ArrowRight } from '@carbon/icons-react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import C4DQuote from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import C4DQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import C4DQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { QUOTE_TYPES } from '../quote';
import readme from './README.stories.react.mdx';

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
    args?.Quote ?? {};
  return (
    <C4DQuote mark-type={quoteMark}>
      {copy}
      <C4DQuoteSourceHeading>{sourceHeading}</C4DQuoteSourceHeading>
      <C4DQuoteSourceCopy>{sourceCopy}</C4DQuoteSourceCopy>
      <C4DQuoteSourceBottomCopy>{sourceBottomCopy}</C4DQuoteSourceBottomCopy>
      <C4DLinkWithIcon slot="footer" href="https://example.com">
        Link with icon <ArrowRight size="20" slot="icon" />
      </C4DLinkWithIcon>
    </C4DQuote>
  );
};

Default.story = {
  parameters: {
    knobs: {
      Quote: () => ({
        copy: textNullable(
          'Quote (copy):',
          'Bringing together the technology and expertise for a new way to create'
        ),
        quoteMark: select(
          'Quote Mark (markType):',
          types,
          types['double-curved']
        ),
        sourceHeading: textNullable(
          'Source heading (source-heading slot)',
          'John Doe'
        ),
        sourceCopy: textNullable(
          'Source copy (source-copy slot)',
          'Senior Vice President'
        ),
        sourceBottomCopy: textNullable(
          'Source bottom copy (source-bottom-copy slot)',
          'IBM Cloud'
        ),
      }),
    },
    propsSet: {
      default: {
        Quote: {
          copy: 'Bringing together the technology and expertise for a new way to create',
          quoteMark: 'double-curved',
          sourceHeading: 'John Doe',
          sourceCopy: 'Senior Vice President',
          sourceButtonCopy: 'IBM Cloud',
        },
      },
    },
  },
};

export default {
  title: 'Components/Quote',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-10">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
