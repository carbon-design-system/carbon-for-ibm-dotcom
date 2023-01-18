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
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import DDSCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import './index.css';

const App = () => (
  <DDSCTABlock no-border>
    <DDSContentBlockHeading>DDS Content Block Heading</DDSContentBlockHeading>
    <DDSContentBlockCopy>DDS Content Block Copy</DDSContentBlockCopy>

    <DDSButtonGroup slot="action">
      <DDSButtonGroupItem href="https://example.com">Secondary Button</DDSButtonGroupItem>
      <DDSButtonGroupItem ref="https://example.com">Primary button</DDSButtonGroupItem>
    </DDSButtonGroup>

    <DDSCTABlockItemRow>
      <DDSCTABlockItem>
        <DDSContentItemHeading>Get connected</DDSContentItemHeading>
        <DDSContentItemCopy>
          IBM DevOps partners have a wide range of expertise. Find one to build that right solution for you.
        </DDSContentItemCopy>
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Find a partner
        </DDSTextCTA>
      </DDSCTABlockItem>

      <DDSCTABlockItem>
        <DDSContentItemHeading>Learn how</DDSContentItemHeading>
        <DDSContentItemCopy>Dig into more self-directed larning about DevOps methodologies.</DDSContentItemCopy>
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Browse tutorials
        </DDSTextCTA>
      </DDSCTABlockItem>

      <DDSCTABlockItem>
        <DDSContentItemHeading>Learn how</DDSContentItemHeading>
        <DDSContentItemCopy>Dig into more self-directed larning about DevOps methodologies.</DDSContentItemCopy>
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Browse tutorials
        </DDSTextCTA>
      </DDSCTABlockItem>
    </DDSCTABlockItemRow>
  </DDSCTABlock>
);

render(<App />, document.getElementById('root'));
