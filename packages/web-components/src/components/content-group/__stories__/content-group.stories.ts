/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../content-item/index';
import '../../cta/text-cta';
import '../../image/index';
import { html } from 'lit';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = (args) => {
  const { heading, showCopy, copy, cta, addChildren } =
    args?.ContentGroup ?? {};
  return html`
    <dds-content-group>
      <dds-content-group-heading>${heading}</dds-content-group-heading>
      ${showCopy
        ? html` <dds-content-group-copy>${copy}</dds-content-group-copy> `
        : ''}
      ${addChildren.includes('Content item simple')
        ? html`
            <dds-content-item>
              <dds-content-item-heading
                >Natural language understanding</dds-content-item-heading
              >
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</dds-content-item-copy
              >
            </dds-content-item>
          `
        : ``}
      ${addChildren.includes('Content item with image')
        ? html`
            <dds-content-item>
              <dds-content-item-heading
                >Natural language understanding</dds-content-item-heading
              >
              <dds-image
                slot="media"
                alt="Image alt text"
                default-src="${imgLg16x9}"
                heading="Image caption text">
                <dds-image-item
                  media="(min-width: 672px)"
                  srcset="${imgLg16x9}">
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 400px)"
                  srcset="${imgMd16x9}">
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 320px)"
                  srcset="${imgSm16x9}">
                </dds-image-item>
              </dds-image>
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</dds-content-item-copy
              >
              <dds-text-cta
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                Read more about NLP
              </dds-text-cta>
            </dds-content-item>
          `
        : ``}
      ${addChildren.includes('Content item with video')
        ? html`
            <dds-content-item>
              <dds-content-item-heading
                >Natural language understanding</dds-content-item-heading
              >
              <dds-video-player-container
                slot="media"
                video-id="1_9h94wo6b"></dds-video-player-container>
              <dds-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</dds-content-item-copy
              >
              <dds-text-cta
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                Read more about NLP
              </dds-text-cta>
            </dds-content-item>
          `
        : ``}
      ${cta
        ? html`
            <dds-card-link-cta
              slot="footer"
              cta-type="local"
              href="https://www.example.com">
              <dds-card-link-heading
                >Learn more about natual language
                processing</dds-card-link-heading
              >
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-link-cta>
          `
        : ''}
    </dds-content-group>
  `;
};

export default {
  title: 'Components/Content group',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            <dds-video-cta-container> ${story()} </dds-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroup: () => ({
        heading: textNullable('Heading:', 'Natural language processing (NLP)'),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et ' +
          'magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula,' +
          ' vitae finibus ante aliquet a.',
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
        cta: boolean('CTA:', true),
      }),
    },
    propsSet: {
      default: {
        ContentGroup: {
          heading: 'Natural language processing (NLP)',
          showCopy: 'Copy:',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
            ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et ' +
            'magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula,' +
            ' vitae finibus ante aliquet a.',
          addChildren: '',
          cta: true,
        },
      },
    },
  },
};
