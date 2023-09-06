/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, optionsKnob } from '@storybook/addon-knobs';
import React from 'react';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';

// @ts-ignore
import C4DContentBlock from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
// eslint-disable-next-line max-len
import C4DContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListCard from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item-card';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

import readme from './README.stories.react.mdx';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../defs';

const itemsHeading = 'Lorem ipsum dolor sit amet.';

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

const itemsCopy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const image = (
  <C4DImage
    slot="media"
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet.">
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9}>
      {' '}
    </C4DImageItem>
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9}>
      {' '}
    </C4DImageItem>
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9}>
      {' '}
    </C4DImageItem>
  </C4DImage>
);

const items = [
  {
    itemsHeading,
    itemsCopy,
  },
  {
    itemsHeading,
    itemsCopy: copyWithList,
  },
  {
    itemsHeading,
    itemsCopy,
  },
];

export const Default = (args) => {
  const { heading, copy, showCopy, addChildren, showCTA, border, aside } =
    args?.ContentBlock ?? {};
  return (
    <C4DContentBlock
      complementaryStyleScheme={
        border ? CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER : ''
      }>
      {heading ? (
        <C4DContentBlockHeading>
          What is the latest news in artificial intelligence?
        </C4DContentBlockHeading>
      ) : (
        ''
      )}
      {showCopy ? <C4DContentBlockCopy>{copy}</C4DContentBlockCopy> : ''}
      {addChildren.includes('Content group simple') ? (
        <C4DContentGroupSimple>
          <C4DContentGroupHeading>
            Natural language processing (NLP)
          </C4DContentGroupHeading>
          <C4DContentGroupCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            non porttitor libero, in venenatis magna.
          </C4DContentGroupCopy>
          {image}
          {items.map(({ itemsHeading: itemHeading, itemsCopy: itemCopy }) => (
            <C4DContentItem>
              <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
              <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
            </C4DContentItem>
          ))}
        </C4DContentGroupSimple>
      ) : (
        ''
      )}

      {showCTA ? (
        <C4DCardLinkCTA
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          <C4DCardLinkHeading>
            Learn more about natural langauge processing
          </C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      ) : (
        ''
      )}
      {aside ? (
        <C4DLinkList type="default" slot="complementary">
          <C4DLinkListHeading>Tutorials</C4DLinkListHeading>

          <C4DLinkListCard href="https://example.com">
            <p>Learn more about Kubernetes</p>
            <C4DCardFooter>
              <ArrowRight20 slot="icon" />
            </C4DCardFooter>
          </C4DLinkListCard>

          <C4DLinkListCard href="https://example.com">
            <p>Containerziation A Complete Guide</p>
            <C4DCardFooter>
              <ArrowRight20 slot="icon" />
            </C4DCardFooter>
          </C4DLinkListCard>
        </C4DLinkList>
      ) : (
        ''
      )}
    </C4DContentBlock>
  );
};

export default {
  title: 'Components/Content block',
  decorators: [
    (story) => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlock: () => ({
        heading: boolean('Heading:', true),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
          ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
          'ligula, vitae finibus ante aliquet a.',

        aside: boolean('Aside:', false),
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content group simple': 'Content group simple',
          },
          '',
          { display: 'multi-select' }
        ),
        showCTA: boolean('CTA:', true),
        border: boolean('Border:', false),
      }),
    },
    propsSet: {
      default: {
        ContentBlock: {
          heading: true,
          showCopy: true,
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
            ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
            ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
            'ligula, vitae finibus ante aliquet a.',
          aside: false,
          addChildren: '',
          showCTA: true,
          border: false,
        },
      },
    },
  },
};
