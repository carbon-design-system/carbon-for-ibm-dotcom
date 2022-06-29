/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import { select, boolean } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';

export const Default = ({ parameters }) => {
  const { heading, media, copy, showCopy, ctaStyle, ctaCopy } = parameters?.props?.ContentItem ?? {};
  return html`
    <dds-content-item>
      ${media === 'image'
        ? html`
            <dds-image slot="media" alt="Alt image text" default-src="${imgLg16x9}" heading="Image caption text"></dds-image>
          `
        : ``}
      ${media === 'video'
        ? html`
            <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
          `
        : ''}
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      ${showCopy
        ? html`
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          `
        : ``}
      ${ctaStyle === 'text'
        ? html`
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://www.example.com"
              >${ctaCopy}</dds-text-cta
            >
          `
        : ``}
      ${ctaStyle === 'button'
        ? html`
            <dds-button-cta slot="footer" cta-type="local" href="https://www.example.com">${ctaCopy}</dds-button-cta>
          `
        : ``}
    </dds-content-item>
  `;
};

export default {
  title: 'Components/Content item',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-10">
            <dds-video-container>
              ${story()}
            </dds-video-container>
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
