/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardSectionOffset from '@carbon/ibmdotcom-web-components/es/components-react/card-section-offset/card-section-offset';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <DDSCardSectionOffset>
    <DDSBackgroundMedia
      gradient-direction="left-to-right"
      mobile-position="top"
      alt={'alt'}
      default-src={'https://fpoimg.com/1584x891?bg_color=ee5396&text_color=161616'}></DDSBackgroundMedia>
    <DDSContentBlockHeading slot="heading">Heading</DDSContentBlockHeading>
    <DDSTextCTA slot="action" icon-placement="right" cta-type={'local'} href={'https://example.com'}>
      Copy
    </DDSTextCTA>
    <DDSCardGroup slot="card-group" cards-per-row="2">
      <DDSCardGroupItem empty></DDSCardGroupItem>
      <DDSCardGroupItem href="https://example.com">
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</DDSCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <DDSCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardGroupItem>
      <DDSCardGroupItem href="https://example.com">
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</DDSCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <DDSCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardGroupItem>
      <DDSCardGroupItem href="https://example.com">
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</DDSCardHeading>
        <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
        <DDSCardCTAFooter slot="footer">
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardGroupItem>
    </DDSCardGroup>
  </DDSCardSectionOffset>
);

render(<App />, document.getElementById('root'));
