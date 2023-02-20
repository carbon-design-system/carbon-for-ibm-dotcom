/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { heading, media, copy, showCopy, ctaStyle, ctaCopy } = parameters?.props?.ContentItem ?? {};
  return (
    <DDSContentItem>
      {media === 'image' ? (
        <DDSImage slot="media" alt="Alt image text" default-src={imgLg16x9} heading="Image caption text"></DDSImage>
      ) : (
        ''
      )}
      {media === 'video' ? <DDSVideoPlayerContainer slot="media" video-id="1_9h94wo6b"></DDSVideoPlayerContainer> : ''}
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      {showCopy ? <DDSContentItemCopy>{copy}</DDSContentItemCopy> : ''}
      {ctaStyle === 'text' ? (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href="https://www.example.com">
          {ctaCopy}
        </DDSTextCTA>
      ) : (
        ''
      )}
      {ctaStyle === 'button' ? (
        <DDSButtonCTA slot="footer" cta-type="local" href="https://www.example.com">
          {ctaCopy}
        </DDSButtonCTA>
      ) : (
        ''
      )}
    </DDSContentItem>
  );
};

export default {
  title: 'Components/Content item',
  decorators: [
    story => {
      return (
        <>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-sm-4 bx--col-lg-10">{story()}</div>
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
      ContentItem: () => ({
        heading: textNullable('Heading:', 'Natural language understanding'),
        media: select('Media type:', ['none', 'image', 'video'], 'none'),
        showCopy: boolean('Copy:', true),
        copy:
          'This area of NLP takes "real world" text and applies a symbolic ' +
          'system for a machine to interpret its meaning, using formal logic; structures ' +
          'that describe the various relationships between concepts (ontologies); and other semantic tools.',
        ctaStyle: select('CTA style:', ['text', 'button'], 'text'),
        ctaCopy: textNullable('CTA copy:', 'Learn more about NLP'),
      }),
    },
    propsSet: {
      default: {
        ContentItem: {
          heading: 'Natural language understanding',
          media: 'none',
          showCopy: true,
          copy:
            'This area of NLP takes "real world" text and applies a symbolic ' +
            'system for a machine to interpret its meaning, using formal logic; structures ' +
            'that describe the various relationships between concepts (ontologies); and other semantic tools.',
          ctaStyle: 'text',
          ctaCopy: 'Learn more about NLP',
        },
      },
    },
  },
};
