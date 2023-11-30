/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { optionsKnob } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import C4DContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import C4DContentSection from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section';
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import C4DContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const blockCopy = `Simply: when a technology gives a machine any ability that mimics human thought processes, we call it “artificial intelligence” (or AI).

Human fascination with thinking machines has been with us as long as machines themselves. In every generation, new technologies perform tasks that we previously believed were only possible for humans. Our curiosity drives us to make technology always do more, and better.

And here's an intriguing paradox: over time, as our assumptions shift about what machines can and can't do, we also gradually change our assessment of what counts as “genuine” intelligence. So what we call “artificial intelligence” keeps changing, too.

For example: optical scan of documents (to create a text file out of an image of text) used to be considered artificial intelligence before it became common in our everyday lives. Observers of the history of AI call this phenomenon "the AI effect."
`;

const card1 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </C4DCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <C4DCardFooter icon-placemenet="left">
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);

const card2 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </C4DCardHeading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <C4DCardFooter icon-placemenet="left">
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
} = {}) => (
  <C4DCard href={href}>
    <C4DCardHeading>{heading}</C4DCardHeading>
    {copy}
    <C4DCardFooter>
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DCard>
);

export const Default = (args) => {
  const { heading, copy, addChildren } = args?.ContentSection ?? {};
  const classes = addChildren.includes('Content block simple')
    ? 'cds--col-lg-16 cds--no-gutter'
    : '';
  return (
    <C4DContentSection childrenCustomClass={classes}>
      <C4DContentSectionHeading>{heading}</C4DContentSectionHeading>
      <C4DContentSectionCopy>{copy}</C4DContentSectionCopy>
      {addChildren.includes('Content block simple') ? (
        <C4DContentBlockSimple>
          <C4DContentBlockHeading>
            What's the latest news in artificial intelligence?
          </C4DContentBlockHeading>
          <C4DContentBlockCopy size="sm">{blockCopy}</C4DContentBlockCopy>
          <C4DVideoPlayerContainer
            slot="media"
            video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
          <C4DTextCTA slot="footer" cta-type="jump" href="https://www.ibm.com">
            Jump to AI ethics and trust
          </C4DTextCTA>
        </C4DContentBlockSimple>
      ) : (
        ''
      )}
      {addChildren.includes('Card group') ? (
        <C4DCardGroup>
          {card1}
          {card2}
          {card1}
          {card2}
        </C4DCardGroup>
      ) : (
        ''
      )}
      {addChildren.includes('Link list') ? (
        <C4DLinkList>
          <C4DLinkListItem href="https://example.com">
            Learn more about Kubernetes and automating deployment
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Containerization A Complete Guide
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Microservices and container
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Learn more about Kubernetes and automating deployment
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Containerization A Complete Guide
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Microservices and container
            <ArrowRight20 slot="icon" />
          </C4DLinkListItem>
        </C4DLinkList>
      ) : (
        ''
      )}

      {addChildren.includes('Carousel') ? (
        <C4DCarousel>
          {Card()}
          {Card({ copy: copyOdd })}
          {Card()}
          {Card({ copy: copyOdd })}
          {Card()}
        </C4DCarousel>
      ) : (
        ''
      )}

      <C4DTextCTA slot="footer" cta-type="local" href="https://www.example.com">
        Link action
      </C4DTextCTA>
    </C4DContentSection>
  );
};

export default {
  title: 'Components/Content section',
  decorators: [
    (story) => {
      return (
        <>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-16 cds--no-gutter">
                <C4DVideoCTAContainer>{story()}</C4DVideoCTAContainer>
              </div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      escapeHTML: false,
      ContentSection: () => ({
        heading: textNullable(
          'Heading:',
          'Speech recognition (statistical Artificial Intelligence)'
        ),
        copy: textNullable(
          'Copy:',
          "AI features for understanding speech can be trained for a specific speaker's voice."
        ),
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content block simple': 'Content block simple',
            'Card group': 'Card group',
            'Link list': 'Link list',
            Carousel: 'Carousel',
          },
          '',
          { display: 'select' }
        ),
      }),
    },
    propsSet: {
      default: {
        ContentSection: {
          heading: 'Speech recognition (statistical Artificial Intelligence)',
          copy: "AI features for understanding speech can be trained for a specific speaker's voice.",
          addChildren: '',
        },
      },
    },
  },
};
