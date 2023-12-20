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
import C4DContentBlockMixed from '@carbon/ibmdotcom-web-components/es/components-react/content-block-mixed/content-block-mixed.js';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import C4DContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import C4DContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import C4DPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import TouchScreen from '@carbon/pictograms-react/es/touch--screen/index.js';
import './index.css';

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-8 cds--offset-lg-4">
        <C4DContentBlockMixed>
          <C4DContentBlockHeading>Lorem ipsum dolor sit amet</C4DContentBlockHeading>
          <C4DContentBlockCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          </C4DContentBlockCopy>
          <C4DContentGroupCards>
            <C4DContentGroupHeading>Content group heading</C4DContentGroupHeading>
            <C4DContentGroupCardsItem href="www.ibm.com">
              <C4DCardHeading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
              </C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <C4DCardFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardFooter>
            </C4DContentGroupCardsItem>
            <C4DContentGroupCardsItem href="www.ibm.com">
              <C4DCardHeading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
              </C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <C4DCardFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardFooter>
            </C4DContentGroupCardsItem>
          </C4DContentGroupCards>
          <C4DContentGroupPictograms>
            <C4DContentGroupHeading>Curabitur malesuada varius mi eu posuere</C4DContentGroupHeading>
            <C4DContentGroupCopy>Lorem ipsum *dolor* sit amet</C4DContentGroupCopy>
            <C4DPictogramItem>
              <TouchScreen slot="pictogram" />
              <C4DContentItemHeading>Lorem ipsum dolor sit amet</C4DContentItemHeading>
              <C4DContentItemCopy>Lorem ipsum dolor sit amet</C4DContentItemCopy>
              <C4DLinkWithIcon href="https://www.ibm.com/" slot="footer">
                Link text <ArrowRight20 slot="icon" />
              </C4DLinkWithIcon>
            </C4DPictogramItem>
          </C4DContentGroupPictograms>
          <C4DContentGroupSimple>
            <C4DContentGroupHeading>Curabitur malesuada varius mi eu posuere</C4DContentGroupHeading>
            <C4DContentGroupCopy>Lorem ipsum *dolor* sit amet</C4DContentGroupCopy>
            <C4DImage
              slot="media"
              alt="Image alt text"
              defaultSrc="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              heading="Curabitur malesuada varius mi eu posuere">
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
            <C4DCardLinkCTA slot="footer" cta-type="local" href="https://example.com">
              <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
              <C4DCardCTAFooter></C4DCardCTAFooter>
            </C4DCardLinkCTA>
          </C4DContentGroupSimple>
        </C4DContentBlockMixed>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
