/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, optionsKnob } from '@storybook/addon-knobs';
import ContentBlockSimple from '../../ContentBlockSimple/ContentBlockSimple';
import ContentItem from '../../ContentItem/ContentItem';
import ContentSection from '../ContentSection';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const blockCopy = `Simply: when a technology gives a machine any ability that mimics human thought processes, we call it “artificial intelligence” (or AI).

Human fascination with thinking machines has been with us as long as machines themselves. In every generation, new technologies perform tasks that we previously believed were only possible for humans. Our curiosity drives us to make technology always do more, and better.

And here's an intriguing paradox: over time, as our assumptions shift about what machines can and can't do, we also gradually change our assessment of what counts as “genuine” intelligence. So what we call “artificial intelligence” keeps changing, too.

For example: optical scan of documents (to create a text file out of an image of text) used to be considered artificial intelligence before it became common in our everyday lives. Observers of the history of AI call this phenomenon "the AI effect."
`;

const itemCopy = `This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic tools.`;

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
              'Content item': 'Content item',
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
      children={[
        addChildren.includes('Content block simple') ? (
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
        ) : (
          ''
        ),
        addChildren.includes('Content item') ? (
          <ContentItem
            heading="Natural language understanding"
            mediaType="image"
            mediaData={{
              heading: 'Image caption text',
              image: {
                defaultSrc: imgLg16x9,
                alt: 'Image alt text',
              },
            }}
            copy={itemCopy}
            cta={{
              style: 'text',
              type: 'local',
              copy: 'Learn more about NLP',
              href: 'https://www.example.com',
            }}
          />
        ) : (
          ''
        ),
      ]}
    />
  );
};
