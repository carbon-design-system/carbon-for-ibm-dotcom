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
import C4DContentBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
// eslint-disable-next-line max-len
import C4DContentBlockMediaContent from '@carbon/ibmdotcom-web-components/es/components-react/content-block-media/content-block-media-content';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DFeatureCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

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

export const Default = (args) => {
  const {
    blockHeading,
    simpleGroupHeading,
    featureCard,
    complementaryStyleScheme,
  } = args?.ContentBlockMedia ?? {};
  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = blockHeading;
  }

  return (
    <C4DContentBlockMedia
      complementary-style-scheme={complementaryStyleScheme || undefined}>
      <C4DContentBlockHeading>{blockHeading}</C4DContentBlockHeading>
      <C4DContentBlockCopy size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </C4DContentBlockCopy>
      <C4DContentBlockMediaContent>
        <C4DContentGroupHeading>{simpleGroupHeading}</C4DContentGroupHeading>
        <C4DImage
          slot="media"
          alt="Image alt text"
          defaultSrc={imgLg16x9}
          heading="Lorem ipsum">
          <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </C4DImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <C4DContentItem>
            <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
            <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
          </C4DContentItem>
        ))}
        <C4DCardLinkCTA
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentBlockMediaContent>
      <C4DContentBlockMediaContent>
        <C4DContentGroupHeading>{simpleGroupHeading}</C4DContentGroupHeading>
        <C4DImage
          slot="media"
          alt="Image alt text"
          defaultSrc={imgLg16x9}
          heading="Lorem ipsum">
          <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </C4DImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <C4DContentItem>
            <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
            <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
          </C4DContentItem>
        ))}
        <C4DCardLinkCTA
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentBlockMediaContent>
      <C4DContentBlockMediaContent>
        {featureCard === 'CTA' ? (
          <C4DFeatureCTA href="https://example.com" cta-type="local">
            <C4DImage
              slot="image"
              alt="Feature card image"
              default-src={imgLg1x1}
            />
            <C4DCardHeading>Consectetur adipisicing elit</C4DCardHeading>
            <C4DFeatureCTAFooter></C4DFeatureCTAFooter>
          </C4DFeatureCTA>
        ) : (
          ''
        )}
      </C4DContentBlockMediaContent>
    </C4DContentBlockMedia>
  );
};

export const withLinkList = (args) => {
  const {
    blockHeading,
    simpleGroupHeading,
    featureCard,
    linkListHeading,
    complementaryStyleScheme,
    totalLinks,
  } = args?.ContentBlockMedia ?? {};
  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = blockHeading;
  }

  return (
    <C4DContentBlockMedia
      complementary-style-scheme={complementaryStyleScheme || undefined}>
      <C4DContentBlockHeading>{blockHeading}</C4DContentBlockHeading>
      <C4DContentBlockCopy size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </C4DContentBlockCopy>
      <C4DContentBlockMediaContent>
        <C4DContentGroupHeading>{simpleGroupHeading}</C4DContentGroupHeading>
        <C4DImage
          slot="media"
          alt="Image alt text"
          defaultSrc={imgLg16x9}
          heading="Lorem ipsum">
          <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </C4DImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <C4DContentItem>
            <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
            <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
          </C4DContentItem>
        ))}
        <C4DCardLinkCTA
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentBlockMediaContent>
      <C4DContentBlockMediaContent>
        <C4DContentGroupHeading>{simpleGroupHeading}</C4DContentGroupHeading>
        <C4DImage
          slot="media"
          alt="Image alt text"
          defaultSrc={imgLg16x9}
          heading="Lorem ipsum">
          <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
          <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
          <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
        </C4DImage>
        {items.map(({ heading: itemHeading, copy: itemCopy }) => (
          <C4DContentItem>
            <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
            <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
          </C4DContentItem>
        ))}
        <C4DCardLinkCTA
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentBlockMediaContent>
      <C4DContentBlockMediaContent>
        {featureCard === 'CTA' ? (
          <C4DFeatureCTA href="https://example.com" cta-type="local">
            <C4DImage
              slot="image"
              alt="Feature card image"
              default-src={imgLg1x1}
            />
            <C4DCardHeading>Consectetur adipisicing elit</C4DCardHeading>
            <C4DFeatureCTAFooter></C4DFeatureCTAFooter>
          </C4DFeatureCTA>
        ) : (
          ''
        )}
      </C4DContentBlockMediaContent>
      <C4DLinkList type="default" slot="complementary">
        <C4DLinkListHeading>{linkListHeading}</C4DLinkListHeading>
        {linkListItems.slice(0, totalLinks).map((linkListCopy) => (
          <C4DLinkListItemCTA
            href="https://example.com"
            cta-type="local"
            type="default">
            <p>{linkListCopy}</p>
          </C4DLinkListItemCTA>
        ))}
      </C4DLinkList>
    </C4DContentBlockMedia>
  );
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: text(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        simpleGroupHeading: text(
          'Simple Group Heading (required)',
          'Lorem ipsum dolor sit amet'
        ),
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
        <div className="cds--grid">
          <div className="cds--row">
            <div className={`${parameters.gridContentClasses} cds--no-gutter`}>
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'cds--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: text(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        simpleGroupHeading: text(
          'Simple Group Heading (required)',
          'Lorem ipsum dolor sit amet'
        ),
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
