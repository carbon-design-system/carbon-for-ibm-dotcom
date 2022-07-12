/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaFeatured from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-featured';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-copy';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-video';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalThumbnailCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-thumbnail-copy';
// @ts-ignore
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
// @ts-ignore
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
// @ts-ignore
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/defs';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../defs';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgMd4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--004.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

const bodyCopy = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est.\n
- [list item](https://www.ibm.com)
  - list item 1a
1. list item 2
   1. list item 2a
`;

const bodyCopyWithFeaturedMedia = `Lorem ipsum *dolor* sit amet, [consectetur
  adipiscing](https://www.ibm.com) elit. Aenean et ultricies est. Mauris
  iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis,consequat libero.`;

export const Default = args => {
  const { eyebrow, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } = args?.ContentItemHorizontal ?? {};

  return (
    <DDSContentItemHorizontal>
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalCopy>{copy}</DDSContentItemHorizontalCopy>
      <DDSLinkList slot="footer" type="vertical">
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href1 || undefined} cta-type={ctaType1 || undefined}>
          {ctaCopy1}
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href2 || undefined} cta-type={ctaType2 || undefined}>
          {ctaCopy2}
        </DDSLinkListItemCTA>
      </DDSLinkList>
    </DDSContentItemHorizontal>
  );
};

Default.story = {
  parameters: {
    gridContentClasses: 'bx--col-lg-10 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        eyebrow: textNullable('Eyebrow (eyebrow):', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: bodyCopy,
        ctaType1: select('CTA 1 type (cta-type)', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type)', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
  },
};

export const withThumbnail = args => {
  const { alt, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } = args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontal thumbnail>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalThumbnailCopy>{copy}</DDSContentItemHorizontalThumbnailCopy>
      <DDSLinkList slot="footer" type="vertical">
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href1 || undefined} cta-type={ctaType1 || undefined}>
          {ctaCopy1}
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href2 || undefined} cta-type={ctaType2 || undefined}>
          {ctaCopy2}
        </DDSLinkListItemCTA>
      </DDSLinkList>
      <DDSImage slot="thumbnail" alt={alt || undefined} default-src={imgMd4x3}></DDSImage>
    </DDSContentItemHorizontal>
  );
};

withThumbnail.story = {
  name: 'With thumbnail',
  parameters: {
    gridContentClasses: 'bx--col-lg-12 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: bodyCopy,
        alt: textNullable('Image alt text', 'Image alt text'),
        ctaType1: select('CTA 1 type (cta-type):', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type):', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
  },
};

export const withMedia = args => {
  const { align, type, alt, heading, eyebrow, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } =
    args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontalMedia align={align}>
      {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
      {type === MEDIA_TYPE.VIDEO ? (
        <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
      ) : (
        ''
      )}
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalMediaCopy>{copy}</DDSContentItemHorizontalMediaCopy>
      <DDSLinkList slot="footer" type="vertical">
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href1 || undefined} cta-type={ctaType1 || undefined}>
          {ctaCopy1}
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href={href2 || undefined} cta-type={ctaType2 || undefined}>
          {ctaCopy2}
        </DDSLinkListItemCTA>
      </DDSLinkList>
    </DDSContentItemHorizontalMedia>
  );
};

withMedia.story = {
  name: 'With media',
  parameters: {
    gridContentClasses: 'bx--col-lg-10',
    knobs: {
      ContentItemHorizontal: () => ({
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.RIGHT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        alt: textNullable('Image alt text', 'Image alt text'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        eyebrow: textNullable('Eyebrow label:', 'Lorem Ipsum'),
        copy: bodyCopy,
        ctaType1: select('CTA 1 type (cta-type):', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type):', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
  },
};

export const withFeaturedMedia = args => {
  const { type, alt, heading, eyebrow, copy, ctaCopy1, ctaCopy2 } = args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontalMediaFeatured>
      {type === MEDIA_TYPE.IMAGE ? (
        <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9} heading="Lorem ipsum dolor sit amet"></DDSImage>
      ) : (
        ''
      )}
      {type === MEDIA_TYPE.VIDEO ? (
        <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
      ) : (
        ''
      )}
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalMediaCopy>{copy}</DDSContentItemHorizontalMediaCopy>
      <DDSLinkList slot="footer" type="vertical">
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href="https://www.ibm.com" cta-type={CTA_TYPE.LOCAL}>
          {ctaCopy1}
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA icon-placement={ICON_PLACEMENT.RIGHT} href="https://www.ibm.com" cta-type={CTA_TYPE.EXTERNAL}>
          {ctaCopy2}
        </DDSLinkListItemCTA>
      </DDSLinkList>
    </DDSContentItemHorizontalMediaFeatured>
  );
};

withFeaturedMedia.story = {
  name: 'With featured media',
  parameters: {
    gridContentClasses: 'bx--col-lg-10',
    knobs: {
      ContentItemHorizontal: () => ({
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        eyebrow: textNullable('Eyebrow:', 'Lorem Ipsum'),
        heading: textNullable('Heading:', 'Aliquam condimentum'),
        copy: bodyCopyWithFeaturedMedia,
        ctaCopy1: textNullable('CTA 1 copy:', 'Learn more'),
        ctaCopy2: textNullable('CTA 2 copy:', 'Microservices and containers'),
      }),
    },
  },
};

export default {
  title: 'Components/Content item horizontal',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className={parameters.gridContentClasses}>{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
