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
import C4DContentBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media.js';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import C4DContentBlockMediaContent from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media-content.js';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import './index.css';

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-12 cds--offset-lg-4">
        <C4DContentBlockMedia>
          <C4DContentBlockHeading>Curabitur malesuada varius mi eu posuere</C4DContentBlockHeading>
          <C4DContentBlockCopy size="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin,
            sodales nulla quis, consequat libero.
          </C4DContentBlockCopy>
          <C4DContentBlockMediaContent>
            <C4DContentGroupHeading>Lorem ipsum dolor sit amet</C4DContentGroupHeading>
            <C4DImage
              slot="media"
              alt="Image alt text"
              defaultSrc="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              heading="Lorem ipsum">
              <C4DImageItem
                media="(min-width: 672px)"
                srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
              <C4DImageItem
                media="(min-width: 400px)"
                srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
              <C4DImageItem
                media="(min-width: 320px)"
                srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
            </C4DImage>
            <C4DContentItem>
              <C4DContentItemHeading>Lorem ipsum dolor sit amet.</C4DContentItemHeading>
              <C4DContentItemCopy>
                Lorem ipsum dolor sit amet, *consectetur* adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.
              </C4DContentItemCopy>
            </C4DContentItem>
            <C4DCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
              <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
              <C4DCardCTAFooter />
            </C4DCardLinkCTA>
          </C4DContentBlockMediaContent>
        </C4DContentBlockMedia>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
