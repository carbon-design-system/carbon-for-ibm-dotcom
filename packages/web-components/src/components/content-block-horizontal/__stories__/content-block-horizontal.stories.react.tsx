/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';

import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const copy =
  'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
  'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
  'Phasellus at elit sollicitudin.';

const linkListItem = (
  <DDSContentItemHorizontal>
    <DDSContentItemHorizontalEyebrow>Lorem ipsum</DDSContentItemHorizontalEyebrow>
    <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
    <DDSContentItemHorizontalCopy>{copy}</DDSContentItemHorizontalCopy>
    <DDSLinkList slot="footer" type="vertical">
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </DDSLinkListItemCTA>
    </DDSLinkList>
  </DDSContentItemHorizontal>
);

export const Default = args => {
  const { heading, border } = args?.ContentBlockHorizontal ?? {};
  const headingElement = document.querySelector('dds-content-block-heading');

  if (headingElement) {
    headingElement.shadowRoot!.textContent = heading;
  }

  return (
    <DDSContentBlockHorizontal border={border}>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      {linkListItem} {linkListItem} {linkListItem}
    </DDSContentBlockHorizontal>
  );
};

export default {
  title: 'Components/Content block horizontal',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlockHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        border: boolean('Bottom Border (border):', true),
      }),
    },
  },
};
