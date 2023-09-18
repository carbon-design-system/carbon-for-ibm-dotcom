/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
// eslint-disable-next-line max-len
import C4DContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
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
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-8 cds--no-gutter">
        <C4DContentGroupPictograms>
          <C4DContentGroupHeading>{groupHeading}</C4DContentGroupHeading>
          <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
          {pictogramsItems.map(({ heading, copy, linkWithIcon }) => (
            <C4DPictogramItem>
              <Pictogram slot="pictogram" />
              <C4DContentItemHeading>{heading}</C4DContentItemHeading>
              <C4DContentItemCopy>{copy}</C4DContentItemCopy>
              <C4DLinkWithIcon href={linkWithIcon.href} slot="footer">
                {linkWithIcon.copy} <ArrowRight20 slot="icon" />
              </C4DLinkWithIcon>
            </C4DPictogramItem>
          ))}
        </C4DContentGroupPictograms>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
