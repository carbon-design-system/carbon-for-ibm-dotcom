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
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
// eslint-disable-next-line max-len
import DDSContentBlockSegmented from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented';
// eslint-disable-next-line max-len
import DDSContentBlockSegmentedItem from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented-item';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container.js';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';

import './index.css';

const image = (
  <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading="Mauris iaculis eget dolor nec hendrerit.">
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </DDSImage>
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

const video = <DDSVideoPlayerContainer slot="media" video-id="0_uka1msg4"></DDSVideoPlayerContainer>;

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-8 bx--no-gutter">
        (
        <DDSContentBlockSegmented>
          <DDSContentBlockHeading>Lorem ipsum dolor sit amet.</DDSContentBlockHeading>
          <DDSContentBlockCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          </DDSContentBlockCopy>
          {image}
          <DDSContentBlockSegmentedItem>
            <DDSContentGroupHeading>Lorem ipsum dolor sit amet.</DDSContentGroupHeading>
            <DDSContentItemCopy>{contentItemCopy}</DDSContentItemCopy>
            <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://example.com">
              Lorem Ipsum dolor sit
            </DDSTextCTA>
          </DDSContentBlockSegmentedItem>
          <DDSContentBlockSegmentedItem>
            <DDSContentGroupHeading>Lorem ipsum dolor sit amet.</DDSContentGroupHeading>
            <DDSContentItemCopy>{contentItemCopy}</DDSContentItemCopy>
            {video}
            <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://example.com">
              Lorem Ipsum dolor sit
            </DDSTextCTA>
          </DDSContentBlockSegmentedItem>
          <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://www.example.com">
            Lorem ipsum dolor
          </DDSTextCTA>
        </DDSContentBlockSegmented>
        )
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
