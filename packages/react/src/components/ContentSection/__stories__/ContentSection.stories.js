/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, optionsKnob } from '@storybook/addon-knobs';
import ContentBlockSimple from '../../ContentBlockSimple/ContentBlockSimple';
import ContentGroupCards from '../../ContentGroupCards/ContentGroupCards';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentSection from '../ContentSection';
import React from 'react';
import readme from '../README.stories.mdx';

const blockCopy = `Simply: when a technology gives a machine any ability that mimics human thought processes, we call it “artificial intelligence” (or AI).

Human fascination with thinking machines has been with us as long as machines themselves. In every generation, new technologies perform tasks that we previously believed were only possible for humans. Our curiosity drives us to make technology always do more, and better.

And here's an intriguing paradox: over time, as our assumptions shift about what machines can and can't do, we also gradually change our assessment of what counts as “genuine” intelligence. So what we call “artificial intelligence” keeps changing, too.

For example: optical scan of documents (to create a text file out of an image of text) used to be considered artificial intelligence before it became common in our everyday lives. Observers of the history of AI call this phenomenon "the AI effect."
`;

const video = {
  videoId: '1_9h94wo6b',
  showCaption: true,
};

export default {
  title: 'Components|Content section',
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentSection: () => {
        return {
          heading: text(
            'Heading:',
            'Speech recognition (statistical Artificial Intelligence)'
          ),
          copy: text(
            'Copy:',
            "AI features for understanding speech can be trained for a specific speaker's voice."
          ),
          addChildren: optionsKnob(
            'Add children:',
            {
              'Content block simple': 'Content block simple',
              'Content group cards': 'Content group cards',
            },
            '',
            { display: 'multi-select' }
          ),
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy, addChildren } =
    parameters?.props?.ContentSection ?? {};
  return (
    <ContentSection
      heading={heading}
      copy={copy}
      cta={{
        href: 'https://www.example.com',
        type: 'local',
        copy: 'Link action',
      }}
      childrenCustomClassName={'bx--col-lg-8'}
      children={
        addChildren.length > 0
          ? [
              addChildren.includes('Content block simple') && (
                <ContentBlockSimple
                  copy={blockCopy}
                  heading="What’s the latest news in artificial intelligence?"
                  cta={{
                    cta: {
                      href: 'https://www.ibm.com',
                    },
                    style: 'text',
                    type: 'jump',
                    copy: 'Jump to AI ethics and trust',
                  }}
                  mediaType="video"
                  mediaData={video}
                />
              ),
              addChildren.includes('Content group cards') && (
                <ContentGroupCards
                  heading={ContentGroupCardsKnobs.heading}
                  copy={ContentGroupCardsKnobs.copy}
                  items={ContentGroupCardsKnobs.items}
                />
              ),
            ]
          : ''
      }
    />
  );
};
