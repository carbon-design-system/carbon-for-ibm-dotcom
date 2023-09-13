/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer.js';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta.js';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading.js';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy.js';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading.js';
// eslint-disable-next-line max-len
import C4DContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item.js';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container.js';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container.js';
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
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '0_ibuqxqbe',
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
  <C4DImage
    slot="media"
    alt="Image alt text"
    default-src={imgLg16x9}
    heading={imageHeading}>
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </C4DImage>
);

export const Default = (args) => {
  const {
    copy: groupCopy,
    heading: groupHeading,
    mediaType,
  } = args?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = args?.CardCTA ?? {};
  return (
    <C4DContentGroupSimple>
      <C4DContentGroupHeading>{groupHeading}</C4DContentGroupHeading>
      <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
      {mediaType === 'Image' ? image({ heading: groupHeading }) : ``}
      {mediaType === 'Video' ? (
        <C4DVideoPlayerContainer
          slot="media"
          video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
      ) : (
        ``
      )}
      {items.map(({ heading: itemHeading, copy: itemCopy }) => (
        <C4DContentItem>
          <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
          <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
        </C4DContentItem>
      ))}
      <C4DCardLinkCTA slot="footer" cta-type={ctaType} href={href}>
        <C4DCardLinkHeading>{ctaCopy}</C4DCardLinkHeading>
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardLinkCTA>
    </C4DContentGroupSimple>
  );
};

export default {
  title: 'Components/Content group simple',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-12 cds--no-gutter">
            <C4DVideoCTAContainer>{story()}</C4DVideoCTAContainer>
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
        heading: text(
          'Heading (heading)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        mediaType: select('With media', mediaTypes, MEDIA_TYPE.IMAGE),
      }),
      CardCTA: () => {
        const ctaType = select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL);
        return {
          copy: text('Copy text (copy)', 'Lorem ipsum dolor sit amet'),
          ctaType,
          href: text(
            knobNamesForType[ctaType ?? CTA_TYPE.LOCAL],
            hrefsForType[ctaType ?? CTA_TYPE.LOCAL]
          ),
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
