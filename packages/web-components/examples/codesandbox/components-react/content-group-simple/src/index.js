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
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy.js';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
// eslint-disable-next-line max-len
import DDSContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container.js';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import './index.css';

const heading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:
  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list item 1a
  1. list item 2
     1. list item 2a
`;

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const items = [
  {
    heading,
    copy,
  },
  {
    heading,
    copy: copyWithList,
  },
  {
    heading,
    copy,
  },
];

const image = ({ heading: imageHeading } = { heading: undefined }) => (
  <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading={imageHeading}>
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </DDSImage>
);

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12 bx--no-gutter">
        <DDSVideoCTAContainer>
          <DDSContentGroupSimple>
            <DDSContentGroupHeading>'Curabitur malesuada varius mi eu posuere'</DDSContentGroupHeading>
            <DDSContentGroupCopy>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
            </DDSContentGroupCopy>
            {image({ heading: 'Curabitur malesuada varius mi eu posuere' })}
            {items.map(({ heading: itemHeading }) => (
              <DDSContentItem>
                <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
                <DDSContentItemCopy>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
                </DDSContentItemCopy>
              </DDSContentItem>
            ))}
            <DDSCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
              <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
              <DDSCardCTAFooter></DDSCardCTAFooter>
            </DDSCardLinkCTA>
          </DDSContentGroupSimple>
        </DDSVideoCTAContainer>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
