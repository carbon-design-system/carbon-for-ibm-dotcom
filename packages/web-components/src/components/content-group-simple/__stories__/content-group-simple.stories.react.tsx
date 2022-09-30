/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy.js';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
// eslint-disable-next-line max-len
import DDSContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container.js';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container.js';
import { select, text } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';
import { CTA_TYPE } from '../../cta/defs';
import { MEDIA_TYPE } from '../defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

const mediaTypes = {
  [`None`]: MEDIA_TYPE.NONE,
  [`Image (${MEDIA_TYPE.IMAGE})`]: MEDIA_TYPE.IMAGE,
  [`Video (${MEDIA_TYPE.VIDEO})`]: MEDIA_TYPE.VIDEO,
};

const heading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:
  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list item 1a
  1. list item 2
     1. list item 2a
`;

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const items = [
  {
    heading,
    copy,
  },
  {
    heading,
    copy: copyWithList,
  },
  {
    heading,
    copy,
  },
];

const image = ({ heading: imageHeading } = { heading: undefined }) => (
  <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading={imageHeading}>
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </DDSImage>
);

export const Default = args => {
  const { copy: groupCopy, heading: groupHeading, mediaType } = args?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = args?.CardCTA ?? {};
  return (
    <DDSContentGroupSimple>
      <DDSContentGroupHeading>{groupHeading}</DDSContentGroupHeading>
      <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
      {mediaType === 'Image' ? image({ heading: groupHeading }) : ``}
      {mediaType === 'Video' ? <DDSVideoPlayerContainer slot="media" video-id="1_9h94wo6b"></DDSVideoPlayerContainer> : ``}
      {items.map(({ heading: itemHeading, copy: itemCopy }) => (
        <DDSContentItem>
          <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
          <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
        </DDSContentItem>
      ))}
      <DDSCardLinkCTA slot="footer" cta-type={ctaType} href={href}>
        <DDSCardLinkHeading>{ctaCopy}</DDSCardLinkHeading>
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardLinkCTA>
    </DDSContentGroupSimple>
  );
};

export default {
  title: 'Components/Content group simple',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--no-gutter">
            <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupSimple: () => ({
        copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.',
        heading: text('Heading (heading)', 'Curabitur malesuada varius mi eu posuere'),
        mediaType: select('With media', mediaTypes, MEDIA_TYPE.IMAGE),
      }),
      CardCTA: () => {
        const ctaType = select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL);
        return {
          copy: text('Copy text (copy)', 'Lorem ipsum dolor sit amet'),
          ctaType,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.LOCAL], hrefsForType[ctaType ?? CTA_TYPE.LOCAL]),
        };
      },
    },
    propsSet: {
      default: {
        ContentGroupSimple: {
          copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.',
          heading: 'Curabitur malesuada varius mi eu posuere',
          mediaType: 'image',
        },
        CardCTA: {
          copy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          href: 'https://www.example.com',
        },
      },
    },
  },
};
