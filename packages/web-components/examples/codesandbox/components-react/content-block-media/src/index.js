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
import DDSContentBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media.js';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import DDSContentBlockMediaContent from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media-content.js';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import './index.css';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
        <DDSContentBlockMedia>
          <DDSContentBlockHeading>Curabitur malesuada varius mi eu posuere</DDSContentBlockHeading>
          <DDSContentBlockCopy size="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin,
            sodales nulla quis, consequat libero.
          </DDSContentBlockCopy>
          <DDSContentBlockMediaContent>
            <DDSContentGroupHeading>Lorem ipsum dolor sit amet</DDSContentGroupHeading>
            <DDSImage
              slot="media"
              alt="Image alt text"
              defaultSrc="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              heading="Lorem ipsum">
              <DDSImageItem
                media="(min-width: 672px)"
                srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
              <DDSImageItem
                media="(min-width: 400px)"
                srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
              <DDSImageItem
                media="(min-width: 320px)"
                srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              />
            </DDSImage>
            <DDSContentItem>
              <DDSContentItemHeading>Lorem ipsum dolor sit amet.</DDSContentItemHeading>
              <DDSContentItemCopy>
                Lorem ipsum dolor sit amet, *consectetur* adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.
              </DDSContentItemCopy>
            </DDSContentItem>
            <DDSCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
              <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
              <DDSCardCTAFooter />
            </DDSCardLinkCTA>
          </DDSContentBlockMediaContent>
        </DDSContentBlockMedia>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
