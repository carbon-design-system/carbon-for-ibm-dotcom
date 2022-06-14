/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSContentBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
// eslint-disable-next-line max-len
import DDSContentBlockMediaContent from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media-content';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSFeatureCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItemCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-card-cta';

import readme from './README.stories.react.mdx';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

const complementaryStyleSchemes = {
  'Without border': null,
  // eslint-disable-next-line max-len
  'With border': CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

const heading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories: \n
  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list "item 1a"
  1. list item 2
     1. list item 2a
        - list item 2a.a
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

const linkListItems = [
  'Containerization A Complete Guide',
  'Why should you use microservices and containers',
  'Learn more about Kubernetes',
  'Explore AI use cases in all industries',
];

export const Default = ({ parameters }) => {
  const { blockHeading, simpleGroupHeading, featureCard, complementaryStyleScheme } = parameters?.props?.ContentBlockMedia ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = blockHeading;
  }

  return (
    <DDSContentBlockMedia complementary-style-scheme={complementaryStyleScheme || undefined}>
      <DDSContentBlockHeading>{blockHeading}</DDSContentBlockHeading>
      <DDSContentBlockCopy size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin, sodales nulla quis,
        consequat libero.
      </DDSContentBlockCopy>
      <DDSContentBlockMediaContent>
        <DDSContentGroupHeading>{simpleGroupHeading}</DDSContentGroupHeading>
        <DDSImage slot="media" alt="Image alt text" defaultSrc={imgLg16x9} heading="Lorem ipsum">
          <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </DDSImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <DDSContentItem>
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
          </DDSContentItem>
        ))}
        <DDSCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentBlockMediaContent>
      <DDSContentBlockMediaContent>
        <DDSContentGroupHeading>{simpleGroupHeading}</DDSContentGroupHeading>
        <DDSImage slot="media" alt="Image alt text" defaultSrc={imgLg16x9} heading="Lorem ipsum">
          <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </DDSImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <DDSContentItem>
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
          </DDSContentItem>
        ))}
        <DDSCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentBlockMediaContent>
      <DDSContentBlockMediaContent>
        {featureCard === 'CTA' ? (
          <DDSFeatureCTA href="https://example.com" cta-type="local">
            <DDSImage slot="image" alt="Feature card image" default-src={imgLg1x1} />
            <DDSCardHeading>Consectetur adipisicing elit</DDSCardHeading>
            <DDSFeatureCTAFooter></DDSFeatureCTAFooter>
          </DDSFeatureCTA>
        ) : (
          ''
        )}
      </DDSContentBlockMediaContent>
    </DDSContentBlockMedia>
  );
};

export const withLinkList = ({ parameters }) => {
  const { blockHeading, simpleGroupHeading, featureCard, linkListHeading, complementaryStyleScheme, totalLinks } =
    parameters?.props?.ContentBlockMedia ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = blockHeading;
  }

  return (
    <DDSContentBlockMedia complementary-style-scheme={complementaryStyleScheme || undefined}>
      <DDSContentBlockHeading>{blockHeading}</DDSContentBlockHeading>
      <DDSContentBlockCopy size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin, sodales nulla quis,
        consequat libero.
      </DDSContentBlockCopy>
      <DDSContentBlockMediaContent>
        <DDSContentGroupHeading>{simpleGroupHeading}</DDSContentGroupHeading>
        <DDSImage slot="media" alt="Image alt text" defaultSrc={imgLg16x9} heading="Lorem ipsum">
          <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </DDSImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <DDSContentItem>
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
          </DDSContentItem>
        ))}
        <DDSCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentBlockMediaContent>
      <DDSContentBlockMediaContent>
        <DDSContentGroupHeading>{simpleGroupHeading}</DDSContentGroupHeading>
        <DDSImage slot="media" alt="Image alt text" defaultSrc={imgLg16x9} heading="Lorem ipsum">
          <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </DDSImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <DDSContentItem>
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
          </DDSContentItem>
        ))}
        <DDSCardLinkCTA slot="footer" href="https://example.com" cta-type="local">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentBlockMediaContent>
      <DDSContentBlockMediaContent>
        {featureCard === 'CTA' ? (
          <DDSFeatureCTA href="https://example.com" cta-type="local">
            <DDSImage slot="image" alt="Feature card image" default-src={imgLg1x1} />
            <DDSCardHeading>Consectetur adipisicing elit</DDSCardHeading>
            <DDSFeatureCTAFooter></DDSFeatureCTAFooter>
          </DDSFeatureCTA>
        ) : (
          ''
        )}
      </DDSContentBlockMediaContent>
      <DDSLinkList type="default" slot="complementary">
        <DDSLinkListHeading>{linkListHeading}</DDSLinkListHeading>
        {linkListItems.slice(0, totalLinks).map(linkListCopy => (
          <DDSLinkListItemCardCTA href="https://example.com" cta-type="local">
            <p>{linkListCopy}</p>
            <DDSCardCTAFooter></DDSCardCTAFooter>
          </DDSLinkListItemCardCTA>
        ))}
      </DDSLinkList>
    </DDSContentBlockMedia>
  );
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'bx--col-lg-12',
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: text('Heading (required)', 'Curabitur malesuada varius mi eu posuere'),
        simpleGroupHeading: text('Simple Group Heading (required)', 'Lorem ipsum dolor sit amet'),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        linkListHeading: text('Link list heading (heading)', 'Tutorials'),
        totalLinks: select('Number of links', [2, 3, 4], 2),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Content block media',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className={`${parameters.gridContentClasses} bx--no-gutter`}>{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'bx--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: text('Heading (required)', 'Curabitur malesuada varius mi eu posuere'),
        simpleGroupHeading: text('Simple Group Heading (required)', 'Lorem ipsum dolor sit amet'),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
  },
};
