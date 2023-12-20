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
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy.js';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
// eslint-disable-next-line max-len
import C4DContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container.js';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
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
  <C4DImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading={imageHeading}>
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </C4DImage>
);

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-lg-12 cds--no-gutter">
        <C4DVideoCTAContainer>
          <C4DContentGroupSimple>
            <C4DContentGroupHeading>'Curabitur malesuada varius mi eu posuere'</C4DContentGroupHeading>
            <C4DContentGroupCopy>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
            </C4DContentGroupCopy>
            {image({ heading: 'Curabitur malesuada varius mi eu posuere' })}
            {items.map(({ heading: itemHeading }) => (
              <C4DContentItem>
                <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
                <C4DContentItemCopy>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
                </C4DContentItemCopy>
              </C4DContentItem>
            ))}
            <C4DCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
              <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
              <C4DCardCTAFooter></C4DCardCTAFooter>
            </C4DCardLinkCTA>
          </C4DContentGroupSimple>
        </C4DVideoCTAContainer>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
