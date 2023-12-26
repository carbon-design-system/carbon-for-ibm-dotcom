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
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import C4DCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import './index.css';

const App = () => (
  <C4DCTABlock no-border>
    <C4DContentBlockHeading>C4D Content Block Heading</C4DContentBlockHeading>
    <C4DContentBlockCopy>C4D Content Block Copy</C4DContentBlockCopy>

    <C4DButtonGroup slot="action">
      <C4DButtonGroupItem href="https://example.com">Secondary Button</C4DButtonGroupItem>
      <C4DButtonGroupItem ref="https://example.com">Primary button</C4DButtonGroupItem>
    </C4DButtonGroup>

    <C4DCTABlockItemRow>
      <C4DCTABlockItem>
        <C4DContentItemHeading>Get connected</C4DContentItemHeading>
        <C4DContentItemCopy>
          IBM DevOps partners have a wide range of expertise. Find one to build that right solution for you.
        </C4DContentItemCopy>
        <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Find a partner
        </C4DTextCTA>
      </C4DCTABlockItem>

      <C4DCTABlockItem>
        <C4DContentItemHeading>Learn how</C4DContentItemHeading>
        <C4DContentItemCopy>Dig into more self-directed larning about DevOps methodologies.</C4DContentItemCopy>
        <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Browse tutorials
        </C4DTextCTA>
      </C4DCTABlockItem>

      <C4DCTABlockItem>
        <C4DContentItemHeading>Learn how</C4DContentItemHeading>
        <C4DContentItemCopy>Dig into more self-directed larning about DevOps methodologies.</C4DContentItemCopy>
        <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="example.com">
          Browse tutorials
        </C4DTextCTA>
      </C4DCTABlockItem>
    </C4DCTABlockItemRow>
  </C4DCTABlock>
);

render(<App />, document.getElementById('root'));
