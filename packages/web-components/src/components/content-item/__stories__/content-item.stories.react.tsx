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
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const { heading, media, copy, showCopy, ctaStyle, ctaCopy } =
    args?.ContentItem ?? {};
  return (
    <C4DContentItem>
      {media === 'image' ? (
        <C4DImage
          slot="media"
          alt="Alt image text"
          default-src={imgLg16x9}
          heading="Image caption text"></C4DImage>
      ) : (
        ''
      )}
      {media === 'video' ? (
        <C4DVideoPlayerContainer
          slot="media"
          video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
      ) : (
        ''
      )}
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      {showCopy ? <C4DContentItemCopy>{copy}</C4DContentItemCopy> : ''}
      {ctaStyle === 'text' ? (
        <C4DTextCTA
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="https://www.example.com">
          {ctaCopy}
        </C4DTextCTA>
      ) : (
        ''
      )}
      {ctaStyle === 'button' ? (
        <C4DButtonCTA
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          {ctaCopy}
        </C4DButtonCTA>
      ) : (
        ''
      )}
    </C4DContentItem>
  );
};

export default {
  title: 'Components/Content item',
  decorators: [
    (story) => {
      return (
        <>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-sm-4 cds--col-lg-10">{story()}</div>
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
