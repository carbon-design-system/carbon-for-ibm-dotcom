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
import DDSContentBlockMixed from '@carbon/ibmdotcom-web-components/es/components-react/content-block-mixed/content-block-mixed.js';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import DDSContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import DDSContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import DDSPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import DDSContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import TouchScreen from '@carbon/pictograms-react/es/touch--screen/index.js';
import './index.css';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
        <DDSContentBlockMixed>
          <DDSContentBlockHeading>Lorem ipsum dolor sit amet</DDSContentBlockHeading>
          <DDSContentBlockCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          </DDSContentBlockCopy>
          <DDSContentGroupCards>
            <DDSContentGroupHeading>Content group heading</DDSContentGroupHeading>
            <DDSContentGroupCardsItem href="www.ibm.com">
              <DDSCardHeading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
              </DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <DDSCardFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardFooter>
            </DDSContentGroupCardsItem>
            <DDSContentGroupCardsItem href="www.ibm.com">
              <DDSCardHeading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
              </DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <DDSCardFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardFooter>
            </DDSContentGroupCardsItem>
          </DDSContentGroupCards>
          <DDSContentGroupPictograms>
            <DDSContentGroupHeading>Curabitur malesuada varius mi eu posuere</DDSContentGroupHeading>
            <DDSContentGroupCopy>Lorem ipsum *dolor* sit amet</DDSContentGroupCopy>
            <DDSPictogramItem>
              <TouchScreen slot="pictogram" />
              <DDSContentItemHeading>Lorem ipsum dolor sit amet</DDSContentItemHeading>
              <DDSContentItemCopy>Lorem ipsum dolor sit amet</DDSContentItemCopy>
              <DDSLinkWithIcon href="https://www.ibm.com/" slot="footer">
                Link text <ArrowRight20 slot="icon" />
              </DDSLinkWithIcon>
            </DDSPictogramItem>
          </DDSContentGroupPictograms>
          <DDSContentGroupSimple>
            <DDSContentGroupHeading>Curabitur malesuada varius mi eu posuere</DDSContentGroupHeading>
            <DDSContentGroupCopy>Lorem ipsum *dolor* sit amet</DDSContentGroupCopy>
            <DDSImage
              slot="media"
              alt="Image alt text"
              defaultSrc="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              heading="Curabitur malesuada varius mi eu posuere">
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
            <DDSCardLinkCTA slot="footer" cta-type="local" href="https://example.com">
              <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
              <DDSCardCTAFooter></DDSCardCTAFooter>
            </DDSCardLinkCTA>
          </DDSContentGroupSimple>
        </DDSContentBlockMixed>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
