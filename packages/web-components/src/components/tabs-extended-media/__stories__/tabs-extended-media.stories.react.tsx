/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DTabsExtendedMedia from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended-media/tabs-extended-media';
// @ts-ignore
import C4DTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
/* eslint-disable max-len */
// @ts-ignore
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
/* eslint-disable max-len */
// @ts-ignore
import C4DContentItemRowMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-media';
/* eslint-disable max-len */
// @ts-ignore
import C4DContentItemRowMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-media-copy';
/* eslint-disable max-len */
// @ts-ignore
import C4DContentItemRowMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-media-video';
// @ts-ignore
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
// @ts-ignore
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
// @ts-ignore
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import readme from './README.stories.react.mdx';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-row/defs';
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

export const Default = (args) => {
  const { sectionHeading, sectionHeadingText, align, type } =
    args?.TabsExtendedMedia ?? {};
  const tabs: any[] = [];

  for (let i = 1; i < 5; i++) {
    tabs.push(
      <C4DTab label={`Tab ${i}`}>
        <C4DContentItemRowMedia align={align}>
          {type === MEDIA_TYPE.IMAGE ? (
            <C4DImage
              slot="media"
              alt="Image alt text"
              default-src={imgLg16x9}></C4DImage>
          ) : (
            ``
          )}
          {type === MEDIA_TYPE.VIDEO ? (
            <C4DContentItemRowMediaVideo video-id="0_ibuqxqbe"></C4DContentItemRowMediaVideo>
          ) : (
            ``
          )}
          <C4DContentItemHeading>Tab heading {i}</C4DContentItemHeading>
          <C4DContentItemRowMediaCopy>
            Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et
            ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
            elit sollicitudin.
          </C4DContentItemRowMediaCopy>
          <C4DLinkList slot="footer" type="vertical">
            <C4DLinkListItemCTA
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="local">
              CTA {i}
            </C4DLinkListItemCTA>
            <C4DLinkListItemCTA
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="external">
              Microservices and containers
            </C4DLinkListItemCTA>
          </C4DLinkList>
        </C4DContentItemRowMedia>
      </C4DTab>
    );
  }
  return (
    <C4DTabsExtendedMedia section-heading={sectionHeading}>
      <C4DContentSectionHeading>
        {sectionHeadingText || undefined}
      </C4DContentSectionHeading>
      {tabs}
    </C4DTabsExtendedMedia>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedMedia: () => {
        const sectionHeading = boolean('Section heading', true);
        const sectionHeadingText =
          sectionHeading && textNullable('Heading', 'Section heading');
        return {
          sectionHeading,
          sectionHeadingText,
          align: select('Alignment (align)', mediaAlign, MEDIA_ALIGN.LEFT),
          type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        };
      },
    },
  },
};

export default {
  title: 'Components/Tabs extended media',
  decorators: [
    (story, args) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div
              className={`${
                args?.TabsExtendedMedia?.sectionHeading
                  ? `cds--col-lg-16`
                  : `cds--col-lg-12`
              } cds--no-gutter`}>
              {story()}
            </div>
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
