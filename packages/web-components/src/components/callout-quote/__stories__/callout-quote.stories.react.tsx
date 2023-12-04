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
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import C4DCalloutQuote from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-quote';
import C4DCalloutLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-link-with-icon';
import C4DQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import C4DQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import C4DQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { QUOTE_TYPES } from '../../quote/quote';
import { COLOR_SCHEME } from '../../../component-mixins/callout/defs';
import readme from './README.stories.react.mdx';

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
  return (
    <C4DCalloutQuote mark-type={quoteMark} color-scheme={colorScheme}>
      {copy}
      <C4DQuoteSourceHeading>{sourceHeading}</C4DQuoteSourceHeading>
      <C4DQuoteSourceCopy>{sourceCopy}</C4DQuoteSourceCopy>
      <C4DQuoteSourceBottomCopy>{sourceBottomCopy}</C4DQuoteSourceBottomCopy>
      <C4DCalloutLinkWithIcon
        slot="footer"
        href="https://example.com"
        cta-type="local">
        Link with icon
      </C4DCalloutLinkWithIcon>
    </C4DCalloutQuote>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CalloutQuote: () => ({
        copy: textNullable(
          'Quote (copy):',
          'Bringing together the technology and expertise for a new way to create'
        ),
        quoteMark: select(
          'Quote Mark (markType):',
          quoteTypes,
          quoteTypes['double-curved']
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
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-11">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
