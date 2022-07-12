/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import DDSQuote from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import DDSQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import DDSQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import DDSQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { QUOTE_TYPES, QUOTE_COLOR_SCHEMES } from '../quote';
import readme from './README.stories.react.mdx';

const types = {
  [`${QUOTE_TYPES.DEFAULT}`]: QUOTE_TYPES.DEFAULT,
  [`${QUOTE_TYPES.SINGLE_CURVED}`]: QUOTE_TYPES.SINGLE_CURVED,
  [`${QUOTE_TYPES.DOUBLE_ANGLE}`]: QUOTE_TYPES.DOUBLE_ANGLE,
  [`${QUOTE_TYPES.SINGLE_ANGLE}`]: QUOTE_TYPES.SINGLE_ANGLE,
  [`${QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED}`]: QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED,
  [`${QUOTE_TYPES.CORNER_BRACKET}`]: QUOTE_TYPES.CORNER_BRACKET,
};

const colorSchemes = {
  [`${QUOTE_COLOR_SCHEMES.REGULAR}`]: QUOTE_COLOR_SCHEMES.REGULAR,
  [`${QUOTE_COLOR_SCHEMES.INVERSE}`]: QUOTE_COLOR_SCHEMES.INVERSE,
};

export const Default = args => {
  const { copy, quoteMark, sourceHeading, sourceCopy, sourceBottomCopy, colorScheme } = args?.Quote ?? {};
  return (
    <DDSQuote color-scheme={colorScheme} mark-type={quoteMark}>
      {copy}
      <DDSQuoteSourceHeading>{sourceHeading}</DDSQuoteSourceHeading>
      <DDSQuoteSourceCopy>{sourceCopy}</DDSQuoteSourceCopy>
      <DDSQuoteSourceBottomCopy>{sourceBottomCopy}</DDSQuoteSourceBottomCopy>
      <DDSLinkWithIcon slot="footer" href="https://example.com">
        Link with icon <ArrowRight20 slot="icon"></ArrowRight20>
      </DDSLinkWithIcon>
    </DDSQuote>
  );
};

Default.story = {
  parameters: {
    knobs: {
      Quote: () => ({
        copy: textNullable('Quote (copy):', 'Bringing together the technology and expertise for a new way to create'),
        quoteMark: select('Quote Mark (markType):', types, types.doubleCurved),
        sourceHeading: textNullable('Source heading (source-heading slot)', 'John Doe'),
        sourceCopy: textNullable('Source copy (source-copy slot)', 'Senior Vice President'),
        sourceBottomCopy: textNullable('Source bottom copy (source-bottom-copy slot)', 'IBM Cloud'),
        colorScheme: select('Color Scheme (color-scheme)', colorSchemes, colorSchemes.regular),
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
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-10">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
