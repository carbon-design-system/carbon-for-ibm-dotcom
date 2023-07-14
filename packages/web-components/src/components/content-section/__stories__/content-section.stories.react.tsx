/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import DDSContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import DDSCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import DDSContentSection from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section';
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import DDSContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const blockCopy = `Simply: when a technology gives a machine any ability that mimics human thought processes, we call it “artificial intelligence” (or AI).

Human fascination with thinking machines has been with us as long as machines themselves. In every generation, new technologies perform tasks that we previously believed were only possible for humans. Our curiosity drives us to make technology always do more, and better.

And here's an intriguing paradox: over time, as our assumptions shift about what machines can and can't do, we also gradually change our assessment of what counts as “genuine” intelligence. So what we call “artificial intelligence” keeps changing, too.

For example: optical scan of documents (to create a text file out of an image of text) used to be considered artificial intelligence before it became common in our everyday lives. Observers of the history of AI call this phenomenon "the AI effect."
`;

const card1 = (
  <DDSContentGroupCardsItem href="https://www.example.com">
    <DDSCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</DDSCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <DDSCardFooter icon-placemenet="left">
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSContentGroupCardsItem>
);

const card2 = (
  <DDSContentGroupCardsItem href="https://www.example.com">
    <DDSCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</DDSCardHeading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <DDSCardFooter icon-placemenet="left">
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSContentGroupCardsItem>
);

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  {copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({ copy = copyDefault, heading = headingDefault, href = hrefDefault } = {}) => (
  <DDSCard href={href}>
    <DDSCardHeading>{heading}</DDSCardHeading>
    {copy}
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCard>
);

export const Default = args => {
  const { heading, copy, addChildren } = args?.ContentSection ?? {};
  return (
    <DDSContentSection>
      <DDSContentSectionHeading>{heading}</DDSContentSectionHeading>
      <DDSContentSectionCopy>{copy}</DDSContentSectionCopy>
      {addChildren.includes('Content block simple') ? (
        <DDSContentBlockSimple>
          <DDSContentBlockHeading>What's the latest news in artificial intelligence?</DDSContentBlockHeading>
          <DDSContentBlockCopy size="sm">{blockCopy}</DDSContentBlockCopy>
          <DDSVideoPlayerContainer slot="media" video-id="1_9h94wo6b"></DDSVideoPlayerContainer>
          <DDSTextCTA slot="footer" cta-type="jump" href="https://www.ibm.com">
            Jump to AI ethics and trust
          </DDSTextCTA>
        </DDSContentBlockSimple>
      ) : (
        ''
      )}
      {addChildren.includes('Card group') ? (
        <DDSCardGroup>
          {card1}
          {card2}
          {card1}
          {card2}
        </DDSCardGroup>
      ) : (
        ''
      )}
      {addChildren.includes('Card group') ? (
        <DDSLinkList>
          <DDSLinkListItem href="https://example.com">
            Learn more about Kubernetes and automating deployment
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Containerization A Complete Guide
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Microservices and container
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Learn more about Kubernetes and automating deployment
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Containerization A Complete Guide
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Microservices and container
            <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
        </DDSLinkList>
      ) : (
        ''
      )}

      {addChildren.includes('Carousel') ? (
        <DDSCarousel>
          {Card()}
          {Card({ copy: copyOdd })}
          {Card()}
          {Card({ copy: copyOdd })}
          {Card()}
        </DDSCarousel>
      ) : (
        ''
      )}

      <DDSTextCTA slot="footer" cta-type="local" href="https://www.example.com">
        Link action
      </DDSTextCTA>
    </DDSContentSection>
  );
};

export default {
  title: 'Components/Content section',
  decorators: [
    story => {
      return (
        <>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-16 bx--no-gutter">
                <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
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
        heading: textNullable('Heading:', 'Speech recognition (statistical Artificial Intelligence)'),
        copy: textNullable('Copy:', "AI features for understanding speech can be trained for a specific speaker's voice."),
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
