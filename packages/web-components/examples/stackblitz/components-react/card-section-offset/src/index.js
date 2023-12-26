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
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardSectionOffset from '@carbon/ibmdotcom-web-components/es/components-react/card-section-offset/card-section-offset';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <C4DCardSectionOffset>
    <C4DBackgroundMedia
      gradient-direction="left-to-right"
      mobile-position="top"
      alt={'alt'}
      default-src={'https://fpoimg.com/1584x891?bg_color=ee5396&text_color=161616'}></C4DBackgroundMedia>
    <C4DContentBlockHeading slot="heading">Heading</C4DContentBlockHeading>
    <C4DTextCTA slot="action" icon-placement="right" cta-type={'local'} href={'https://example.com'}>
      Copy
    </C4DTextCTA>
    <C4DCardGroup slot="card-group" cards-per-row="2">
      <C4DCardGroupItem empty></C4DCardGroupItem>
      <C4DCardGroupItem href="https://example.com">
        <C4DCardEyebrow>Label</C4DCardEyebrow>
        <C4DCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</C4DCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <C4DCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </C4DCardCTAFooter>
      </C4DCardGroupItem>
      <C4DCardGroupItem href="https://example.com">
        <C4DCardEyebrow>Label</C4DCardEyebrow>
        <C4DCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</C4DCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <C4DCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </C4DCardCTAFooter>
      </C4DCardGroupItem>
      <C4DCardGroupItem href="https://example.com">
        <C4DCardEyebrow>Label</C4DCardEyebrow>
        <C4DCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</C4DCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <C4DCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </C4DCardCTAFooter>
      </C4DCardGroupItem>
    </C4DCardGroup>
  </C4DCardSectionOffset>
);

render(<App />, document.getElementById('root'));
