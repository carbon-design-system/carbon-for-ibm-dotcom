/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import { select, boolean } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';

export const Default = (args) => {
  const { heading, media, copy, showCopy, ctaStyle, ctaCopy } =
    args?.ContentItem ?? {};
  return html`
    <c4d-content-item>
      ${media === 'image'
        ? html`
            <c4d-image
              slot="media"
              alt="Alt image text"
              default-src="${imgLg16x9}"
              heading="Image caption text"></c4d-image>
          `
        : ``}
      ${media === 'video'
        ? html`
            <c4d-video-player-container
              slot="media"
              video-id="1_9h94wo6b"></c4d-video-player-container>
          `
        : ''}
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      ${showCopy
        ? html` <c4d-content-item-copy>${copy}</c4d-content-item-copy> `
        : ``}
      ${ctaStyle === 'text'
        ? html`
            <c4d-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="https://www.example.com"
              >${ctaCopy}</c4d-text-cta
            >
          `
        : ``}
      ${ctaStyle === 'button'
        ? html`
            <c4d-button-cta
              slot="footer"
              cta-type="local"
              href="https://www.example.com"
              >${ctaCopy}</c4d-button-cta
            >
          `
        : ``}
    </c4d-content-item>
  `;
};

export default {
  title: 'Components/Content item',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-lg-10">
            <c4d-video-container> ${story()} </c4d-video-container>
          </div>
        </div>
      </div>
    `,
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
