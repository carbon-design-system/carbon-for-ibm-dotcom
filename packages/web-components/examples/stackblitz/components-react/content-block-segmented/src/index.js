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
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
// eslint-disable-next-line max-len
import C4DContentBlockSegmented from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented';
// eslint-disable-next-line max-len
import C4DContentBlockSegmentedItem from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented-item';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container.js';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';

import './index.css';

const image = (
  <C4DImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading="Mauris iaculis eget dolor nec hendrerit.">
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </C4DImage>
);

const contentItemCopy =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ' +
  'sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus ' +
  'efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, ' +
  'tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec ' +
  'quis pretium odio, in dignissim sapien. Lorem ipsum dolor sit amet, ' +
  'consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque ' +
  'diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus ' +
  'turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium ' +
  'elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.';

const video = <C4DVideoPlayerContainer slot="media" video-id="0_uka1msg4"></C4DVideoPlayerContainer>;

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-lg-8 cds--no-gutter">
        (
        <C4DContentBlockSegmented>
          <C4DContentBlockHeading>Lorem ipsum dolor sit amet.</C4DContentBlockHeading>
          <C4DContentBlockCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          </C4DContentBlockCopy>
          {image}
          <C4DContentBlockSegmentedItem>
            <C4DContentGroupHeading>Lorem ipsum dolor sit amet.</C4DContentGroupHeading>
            <C4DContentItemCopy>{contentItemCopy}</C4DContentItemCopy>
            <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://example.com">
              Lorem Ipsum dolor sit
            </C4DTextCTA>
          </C4DContentBlockSegmentedItem>
          <C4DContentBlockSegmentedItem>
            <C4DContentGroupHeading>Lorem ipsum dolor sit amet.</C4DContentGroupHeading>
            <C4DContentItemCopy>{contentItemCopy}</C4DContentItemCopy>
            {video}
            <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://example.com">
              Lorem Ipsum dolor sit
            </C4DTextCTA>
          </C4DContentBlockSegmentedItem>
          <C4DTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://www.example.com">
            Lorem ipsum dolor
          </C4DTextCTA>
        </C4DContentBlockSegmented>
        )
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
