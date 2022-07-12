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
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-horizontal/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

export const Default = args => {
  const { sectionHeading, align, type } = args?.TabsExtendedMedia ?? {};
  const tabs: any[] = [];

  for (let i = 1; i < 5; i++) {
    tabs.push(
      <DDSTab label={`Tab ${i}`}>
        <DDSContentItemHorizontalMedia align={align}>
          {type === MEDIA_TYPE.IMAGE && <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9}></DDSImage>}
          {type === MEDIA_TYPE.VIDEO && (
            <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
          )}
          <DDSContentItemHeading>Tab heading {i}</DDSContentItemHeading>
          <DDSContentItemHorizontalMediaCopy>
            Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin.
          </DDSContentItemHorizontalMediaCopy>
          <DDSLinkList slot="footer" type="vertical">
            <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
              CTA {i}
            </DDSLinkListItemCTA>
            <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
              Microservices and containers
            </DDSLinkListItemCTA>
          </DDSLinkList>
        </DDSContentItemHorizontalMedia>
      </DDSTab>
    );
  }
  return (
    <DDSTabsExtendedMedia>
      <DDSContentSectionHeading>{sectionHeading || undefined}</DDSContentSectionHeading>
      {tabs}
    </DDSTabsExtendedMedia>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedMedia: () => ({
        sectionHeading: textNullable('Heading', 'Section heading'),
        align: select('Alignment (align)', mediaAlign, MEDIA_ALIGN.LEFT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
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
