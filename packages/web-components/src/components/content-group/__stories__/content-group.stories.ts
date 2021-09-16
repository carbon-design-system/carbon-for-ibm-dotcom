/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../content-item/index';
import '../../cta/text-cta';
import '../../image-with-caption/index';
import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, copy, ctaCopy, contentItemSimple, contentItemWithImage, contentItemWithVideo } =
    parameters?.props?.ContentGroup ?? {};
  return html`
    <dds-content-group>
      <dds-content-group-heading>${heading}</dds-content-group-heading>
      <dds-content-group-copy>${copy}</dds-content-group-copy>
      ${contentItemSimple
        ? html`
            <dds-content-item>
              <dds-content-item-heading>Natural language understanding</dds-content-item-heading>
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning,
                using formal logic; structures that describe the various relationships between concepts (ontologies); and other
                semantic tools.</dds-content-item-copy
              >
            </dds-content-item>
          `
        : ``}
      ${contentItemWithImage
        ? html`
            <dds-content-item>
              <dds-content-item-heading>Natural language understanding</dds-content-item-heading>
              <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="Image caption text">
                <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
                <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
                <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
              </dds-image-with-caption>
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning,
                using formal logic; structures that describe the various relationships between concepts (ontologies); and other
                semantic tools.</dds-content-item-copy
              >
              <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">
                Read more about NLP
              </dds-text-cta>
            </dds-content-item>
          `
        : ``}
      ${contentItemWithVideo
        ? html`
            <dds-content-item>
              <dds-content-item-heading>Natural language understanding</dds-content-item-heading>
              <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning,
                using formal logic; structures that describe the various relationships between concepts (ontologies); and other
                semantic tools.</dds-content-item-copy
              >
              <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">
                Read more about NLP
              </dds-text-cta>
            </dds-content-item>
          `
        : ``}
      <dds-card-link-cta slot="footer" cta-type="local" href="https://www.example.com">
        <dds-card-link-heading>${ctaCopy}</dds-card-link-heading>
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-link-cta>
    </dds-content-group>
  `;
};

export default {
  title: 'Components/Content group',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">
        <dds-video-cta-container>
          ${story()}
        </dds-video-cta-container>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentGroup: () => ({
        heading: textNullable('Heading (heading)', 'Natural language processing (NLP)'),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et ' +
          'magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula,' +
          ' vitae finibus ante aliquet a.',
        ctaCopy: textNullable('CTA Copy', 'Learn more about natual language processing'),
        contentItemSimple: boolean('Content item simple', false),
        contentItemWithImage: boolean('Content item with image', false),
        contentItemWithVideo: boolean('Content item with video', false),
      }),
    },
  },
};
