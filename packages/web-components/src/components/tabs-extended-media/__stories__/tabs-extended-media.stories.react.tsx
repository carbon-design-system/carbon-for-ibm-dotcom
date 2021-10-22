/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSTabsExtendedMedia from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended-media/tabs-extended-media';
// @ts-ignore
import DDSTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-copy';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-video';
// @ts-ignore
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
// @ts-ignore
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
// @ts-ignore
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import readme from './README.stories.react.mdx';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-horizontal/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';

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

export const Default = ({ parameters }) => {
  const { sectionHeading, align, type, alt, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } =
    parameters?.props?.TabsExtendedMedia ?? {};
  return (
    <DDSTabsExtendedMedia>
      <DDSContentSectionHeading>{sectionHeading || undefined}</DDSContentSectionHeading>
      <DDSTab label="First tab">
        <DDSContentItemHorizontalMedia align={align}>
          {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
          {type === MEDIA_TYPE.VIDEO ? (
            <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
          ) : (
            ''
          )}
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
      </DDSTab>
      <DDSTab label="Second tab">
        <DDSContentItemHorizontalMedia align={align}>
          {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
          {type === MEDIA_TYPE.VIDEO ? (
            <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
          ) : (
            ''
          )}
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
      </DDSTab>
      <DDSTab label="Third tab">
        <DDSContentItemHorizontalMedia align={align}>
          {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
          {type === MEDIA_TYPE.VIDEO ? (
            <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
          ) : (
            ''
          )}
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
      </DDSTab>
      <DDSTab label="Fourth tab">
        <DDSContentItemHorizontalMedia align={align}>
          {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
          {type === MEDIA_TYPE.VIDEO ? (
            <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
          ) : (
            ''
          )}
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
      </DDSTab>
    </DDSTabsExtendedMedia>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedMedia: () => ({
        sectionHeading: textNullable('Heading', 'Title heading'),
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.LEFT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        alt: textNullable('Image alt text', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy:
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
          'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
          'Phasellus at elit sollicitudin.',
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

export default {
  title: 'Components/Tabs extended media',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-16 bx--no-gutter">{story()}</div>
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
