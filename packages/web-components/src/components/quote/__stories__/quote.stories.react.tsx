/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSQuote from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
// @ts-ignore
import { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import DDSQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import DDSQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import DDSQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import { QUOTE_TYPES, QUOTE_COLOR_SCHEMES } from '../quote';
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

const colorSchemes = {
  [`${QUOTE_COLOR_SCHEMES.REGULAR}`]: QUOTE_COLOR_SCHEMES.REGULAR,
  [`${QUOTE_COLOR_SCHEMES.INVERSE}`]: QUOTE_COLOR_SCHEMES.INVERSE,
};

export const Default = (args) => {
  const {
    copy,
    markType,
    sourceHeading,
    sourceCopy,
    sourceBottomCopy,
    colorScheme,
    footer,
  } = args ?? {};
  return (
    <DDSQuote color-scheme={colorScheme} mark-type={markType}>
      {copy}
      <DDSQuoteSourceHeading>{sourceHeading}</DDSQuoteSourceHeading>
      <DDSQuoteSourceCopy>{sourceCopy}</DDSQuoteSourceCopy>
      <DDSQuoteSourceBottomCopy>{sourceBottomCopy}</DDSQuoteSourceBottomCopy>
      <DDSLinkWithIcon slot="footer" href="https://example.com">
        {footer} <ArrowRight20 slot="icon"></ArrowRight20>
      </DDSLinkWithIcon>
    </DDSQuote>
  );
};

Default.story = {
  argTypes: {
    copy: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
        'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
    },
    markType: {
      control: { type: 'select' },
      options: types,
      defaultValue: types.doubleCurved,
    },
    sourceHeading: {
      control: 'text',
      defaultValue: 'Lorem ipsum dolor sit amet',
    },
    sourceCopy: {
      control: 'text',
      defaultValue: 'consectetur adipiscing elit',
    },
    sourceBottomCopy: {
      control: 'text',
      defaultValue: 'IBM Cloud',
    },
    footer: {
      control: 'text',
      defaultValue: 'Link with icon',
    },
    colorScheme: {
      control: { type: 'select' },
      options: colorSchemes,
      defaultValue: colorSchemes.regular,
    },
    styles: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    propsSet: {
      default: {
        Quote: {
          copy: 'Bringing together the technology and expertise for a new way to create',
          markType: 'double-curved',
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
  component: PropTypesRef,
  decorators: [
    (story) => (
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
