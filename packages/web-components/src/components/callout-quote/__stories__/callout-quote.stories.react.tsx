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
import DDSCalloutQuote from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-quote';
import DDSCalloutLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-link-with-icon';
import DDSQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import DDSQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import DDSQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { QUOTE_TYPES } from '../../quote/quote';
import readme from './README.stories.react.mdx';

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
  return (
    <DDSCalloutQuote mark-type={quoteMark}>
      {copy}
      <DDSQuoteSourceHeading>{sourceHeading}</DDSQuoteSourceHeading>
      <DDSQuoteSourceCopy>{sourceCopy}</DDSQuoteSourceCopy>
      <DDSQuoteSourceBottomCopy>{sourceBottomCopy}</DDSQuoteSourceBottomCopy>
      <DDSCalloutLinkWithIcon slot="footer" href="https://example.com">
        Link with icon <ArrowRight20 slot="icon"></ArrowRight20>
      </DDSCalloutLinkWithIcon>
    </DDSCalloutQuote>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CalloutQuote: ({ groupId }) => ({
        copy: textNullable('Quote (copy):', 'Bringing together the technology and expertise for a new way to create', groupId),
        quoteMark: select('Quote Mark (markType):', types, types.doubleCurved, groupId),
        sourceHeading: textNullable('Source heading (source-heading slot)', 'John Doe', groupId),
        sourceCopy: textNullable('Source copy (source-copy slot)', 'Senior Vice President', groupId),
        sourceBottomCopy: textNullable('Source bottom copy (source-bottom-copy slot)', 'IBM Cloud', groupId),
      }),
    },
    propsSet: {
      default: {
        CalloutQuote: {
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
  title: 'Components/Callout Quote',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-11">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
