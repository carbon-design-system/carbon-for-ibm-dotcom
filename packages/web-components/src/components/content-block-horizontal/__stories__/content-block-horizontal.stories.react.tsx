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
import C4DContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemRow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row';
import C4DContentItemRowEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-eyebrow';
import C4DContentItemRowCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-copy';

import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const copy =
  'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
  'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
  'Phasellus at elit sollicitudin.';

const linkListItem = (
  <C4DContentItemRow>
    <C4DContentItemRowEyebrow>Lorem ipsum</C4DContentItemRowEyebrow>
    <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
    <C4DContentItemRowCopy>{copy}</C4DContentItemRowCopy>
    <C4DLinkList slot="footer" type="vertical">
      <C4DLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external">
        External link text
      </C4DLinkListItemCTA>
    </C4DLinkList>
  </C4DContentItemRow>
);

export const Default = (args) => {
  const { heading, border } = args?.ContentBlockHorizontal ?? {};
  const headingElement = document.querySelector('cds-content-block-heading');

  if (headingElement) {
    headingElement.shadowRoot!.textContent = heading;
  }

  return (
    <C4DContentBlockHorizontal border={border}>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      {linkListItem} {linkListItem} {linkListItem}
    </C4DContentBlockHorizontal>
  );
};

export default {
  title: 'Components/Content block horizontal',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-12 cds--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    percy: {
      skip: true,
    },
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
