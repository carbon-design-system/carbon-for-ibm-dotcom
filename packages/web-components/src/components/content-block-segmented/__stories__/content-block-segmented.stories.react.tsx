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
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItemCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-card-cta';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container.js';
import { select, text } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';

import { CTA_STYLE, CTA_TYPE } from '../../cta/defs';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
};

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const ctaStyles = {
  [`Card Link (${CTA_STYLE.CARDLINK})`]: CTA_STYLE.CARDLINK,
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

const complementaryStyleSchemes = {
  Without: null,
  // eslint-disable-next-line max-len
  'With border': CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

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

const linkListItems = [
  'Containerization A Complete Guide',
  'Why should you use microservices and containers',
  'Learn more about Kubernetes',
  'Explore AI use cases in all industries',
];

export const Default = args => {
  const { heading, copy, ctaStyle, ctaType, complementaryStyleScheme } = args?.ContentBlockSegmented ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent && headingComponent.shadowRoot) {
    headingComponent.shadowRoot.textContent = heading;
  }

  return (
    <DDSContentBlockSegmented complementary-style-scheme={complementaryStyleScheme}>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
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
      {ctaStyle === 'text' ? (
        <DDSTextCTA slot="footer" cta-type={ctaType} icon-placement="right" href={hrefsForType[ctaType]}>
          Lorem ipsum dolor
        </DDSTextCTA>
      ) : (
        <DDSCardLinkCTA slot="footer" cta-type={ctaType} href={hrefsForType[ctaType]}>
          <DDSCardLinkHeading>Lorem ipsum dolor</DDSCardLinkHeading>
          <DDSCardCTAFooter />
        </DDSCardLinkCTA>
      )}
    </DDSContentBlockSegmented>
  );
};

export const withLinkList = args => {
  const { blockHeading, heading, copy, ctaStyle, ctaType, complementaryStyleScheme, totalLinks } =
    args?.ContentBlockSegmented ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent && headingComponent.shadowRoot) {
    headingComponent.shadowRoot.textContent = blockHeading;
  }

  return (
    <DDSContentBlockSegmented complementary-style-scheme={complementaryStyleScheme}>
      <DDSContentBlockHeading>{blockHeading}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
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
        {image}
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://example.com">
          Lorem Ipsum dolor sit
        </DDSTextCTA>
      </DDSContentBlockSegmentedItem>
      <DDSLinkList type="default" slot="complementary">
        <DDSLinkListHeading>{heading}</DDSLinkListHeading>
        {linkListItems.slice(0, totalLinks).map(linkListCopy => (
          <DDSLinkListItemCardCTA href="https://example.com" cta-type="local">
            <p>{linkListCopy}</p>
            <DDSCardCTAFooter />
          </DDSLinkListItemCardCTA>
        ))}
      </DDSLinkList>
      {ctaStyle === 'text' ? (
        <DDSTextCTA slot="footer" cta-type={ctaType} icon-placement="right" href={hrefsForType[ctaType]}>
          Lorem ipsum dolor
        </DDSTextCTA>
      ) : (
        <DDSCardLinkCTA slot="footer" cta-type={ctaType} href={hrefsForType[ctaType]}>
          <DDSCardLinkHeading>Lorem ipsum dolor</DDSCardLinkHeading>
          <DDSCardCTAFooter />
        </DDSCardLinkCTA>
      )}
    </DDSContentBlockSegmented>
  );
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'bx--col-lg-12',
    knobs: {
      ContentBlockSegmented: () => ({
        blockHeading: text('Heading (required)', 'Lorem ipsum dolor sit amet.'),
        heading: text('Link list heading (heading)', 'Tutorials'),
        totalLinks: select('Number of links', [2, 3, 4], 2),
        copy:
          'Lorem ipsum dolor sit amet, consectetur ' +
          'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
          'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
          ' Mauris iaculis eget dolor nec hendrerit.',
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockSegmented: {
          blockHeading: 'Lorem ipsum dolor sit amet.',
          heading: 'Tutorials',
          totalLinks: 2,
          copy:
            'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
            ' Mauris iaculis eget dolor nec hendrerit.',
          ctaStyle: null,
          ctaType: CTA_TYPE.LOCAL,
          complementaryStyleScheme: 'with-border',
        },
      },
    },
  },
};

export default {
  title: 'Components/Content block segmented',
  decorators: [
    (story, { parameters }) => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className={`bx--no-gutter ${parameters.gridContentClasses}`}>{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'bx--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockSegmented: () => ({
        heading: text('Heading (required)', 'Lorem ipsum dolor sit amet.'),
        copy:
          'Lorem ipsum dolor sit amet, consectetur ' +
          'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
          'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
          ' Mauris iaculis eget dolor nec hendrerit.',
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockSegmented: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
            ' Mauris iaculis eget dolor nec hendrerit.',
          ctaStyle: null,
          ctaType: CTA_TYPE.LOCAL,
        },
      },
    },
  },
};
