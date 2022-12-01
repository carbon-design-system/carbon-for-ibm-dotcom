/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20';
// eslint-disable-next-line max-len
import DDSContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import DDSPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import './index.css';

const pictogramsItems = [
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
];

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8 bx--no-gutter">
        <DDSContentGroupPictograms>
          <DDSContentGroupHeading>{groupHeading}</DDSContentGroupHeading>
          <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
          {pictogramsItems.map(({ heading, copy, linkWithIcon }) => (
            <DDSPictogramItem>
              <Pictogram slot="pictogram" />
              <DDSContentItemHeading>{heading}</DDSContentItemHeading>
              <DDSContentItemCopy>{copy}</DDSContentItemCopy>
              <DDSLinkWithIcon href={linkWithIcon.href} slot="footer">
                {linkWithIcon.copy} <ArrowRight20 slot="icon" />
              </DDSLinkWithIcon>
            </DDSPictogramItem>
          ))}
        </DDSContentGroupPictograms>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
