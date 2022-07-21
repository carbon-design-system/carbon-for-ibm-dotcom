/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, optionsKnob } from '@storybook/addon-knobs';
import ContentGroup from '../ContentGroup';
import ContentItem from '../../ContentItem/ContentItem';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--003.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--003.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const props = {
  default: () => {
    const knobs = {
      heading: text('Heading:', 'Natural language processing (NLP)'),
      copy: text(
        'Copy:',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula, vitae finibus ante aliquet a.'
      ),
      addChildren: optionsKnob(
        'Add children:',
        {
          'Content item simple': 'Content item simple',
          'Content item with image': 'Content item with image',
          'Content item with video': 'Content item with video',
        },
        '',
        { display: 'multi-select' }
      ),
      contentItemCta: {
        style: 'text',
        type: 'local',
        href: 'https://www.example.com',
        copy: 'Read more about NLP',
      },
      mediaData: {
        image: {
          heading: 'Image caption text',
          image: {
            sources: [
              {
                src: imgSm16x9,
                breakpoint: 320,
              },
              {
                src: imgMd16x9,
                breakpoint: 400,
              },
              {
                src: imgLg16x9,
                breakpoint: 672,
              },
            ],
            alt: 'Image alt text',
            defaultSrc: imgLg16x9,
          },
        },
        video: {
          videoId: '1_9h94wo6b',
          showCaption: true,
        },
      },
      showCTA: boolean('CTA:', true),
      cta: {
        cta: {
          href: 'https://www.example.com',
        },
        style: 'card',
        type: 'local',
        heading: 'Learn more about natual language processing',
      },
    };
    return knobs;
  },
};

export default {
  title: 'Components/Content group',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const { mediaData, contentItemCta, addChildren } = props?.default() ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroup
            {...props.default()}
            children={[
              addChildren.includes('Content item simple') ? (
                <ContentItem
                  heading="Natural language understanding"
                  copy='This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic tools.'
                />
              ) : (
                ''
              ),
              addChildren.includes('Content item with image') ? (
                <ContentItem
                  heading="Natural language understanding"
                  mediaType="image"
                  mediaData={mediaData.image}
                  copy='This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic tools.'
                  cta={contentItemCta}
                />
              ) : (
                ''
              ),
              addChildren.includes('Content item with video') ? (
                <ContentItem
                  heading="Natural language understanding"
                  mediaType="video"
                  mediaData={mediaData.video}
                  copy='This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic tools.'
                  cta={contentItemCta}
                />
              ) : (
                ''
              ),
            ]}
          />
        </div>
      </div>
    </div>
  );
};
