/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import ContentItem from '../ContentItem';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components/Content item',
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentItem: () => ({
        heading: text('Heading (heading):', 'Natural language understanding'),
        media: select('Media type:', ['none', 'image', 'video'], 'none'),
        copy: text(
          'Copy (copy):',
          'This area of NLP takes "real world" text and applies a symbolic ' +
            'system for a machine to interpret its meaning, using formal logic; structures ' +
            'that describe the various relationships between concepts (ontologies); and other semantic tools.'
        ),
        ctaStyle: select('CTA style', ['text', 'button'], 'text'),
        ctaCopy: text('CTA copy', 'Learn more about NLP'),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, media, copy, ctaStyle, ctaCopy } =
    parameters?.props?.ContentItem ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <ContentItem
            heading={heading}
            mediaType={media}
            mediaData={{
              heading: 'Image caption text',
              image: {
                defaultSrc: imgLg16x9,
                alt: 'Image alt text',
              },
              videoId: '1_9h94wo6b',
              showCaption: true,
            }}
            copy={copy}
            cta={{
              style: ctaStyle,
              type: 'local',
              copy: ctaCopy,
              href: 'https://www.example.com',
              buttons: [
                {
                  copy: 'Learn more about NLP',
                  href: 'https://example.com/',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
