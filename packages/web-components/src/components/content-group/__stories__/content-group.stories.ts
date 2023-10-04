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
    <c4d-content-group>
      <c4d-content-group-heading>${heading}</c4d-content-group-heading>
      ${showCopy
        ? html` <c4d-content-group-copy>${copy}</c4d-content-group-copy> `
        : ''}
      ${addChildren.includes('Content item simple')
        ? html`
            <c4d-content-item>
              <c4d-content-item-heading
                >Natural language understanding</c4d-content-item-heading
              >
              <c4d-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</c4d-content-item-copy
              >
            </c4d-content-item>
          `
        : ``}
      ${addChildren.includes('Content item with image')
        ? html`
            <c4d-content-item>
              <c4d-content-item-heading
                >Natural language understanding</c4d-content-item-heading
              >
              <c4d-image
                slot="media"
                alt="Image alt text"
                default-src="${imgLg16x9}"
                heading="Image caption text">
                <c4d-image-item
                  media="(min-width: 672px)"
                  srcset="${imgLg16x9}">
                </c4d-image-item>
                <c4d-image-item
                  media="(min-width: 400px)"
                  srcset="${imgMd16x9}">
                </c4d-image-item>
                <c4d-image-item
                  media="(min-width: 320px)"
                  srcset="${imgSm16x9}">
                </c4d-image-item>
              </c4d-image>
              <c4d-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</c4d-content-item-copy
              >
              <c4d-text-cta
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                Read more about NLP
              </c4d-text-cta>
            </c4d-content-item>
          `
        : ``}
      ${addChildren.includes('Content item with video')
        ? html`
            <c4d-content-item>
              <c4d-content-item-heading
                >Natural language understanding</c4d-content-item-heading
              >
              <c4d-video-player-container
                slot="media"
                video-id="0_ibuqxqbe"></c4d-video-player-container>
              <c4d-content-item-copy
                >This area of NLP takes "real world" text and applies a symbolic
                system for a machine to interpret its meaning, using formal
                logic; structures that describe the various relationships
                between concepts (ontologies); and other semantic
                tools.</c4d-content-item-copy
              >
              <c4d-text-cta
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                Read more about NLP
              </c4d-text-cta>
            </c4d-content-item>
          `
        : ``}
      ${cta
        ? html`
            <c4d-card
              slot="footer"
              cta-type="local"
              href="https://www.example.com">
              <c4d-card-link-heading
                >Learn more about natual language
                processing</c4d-card-link-heading
              >
              <c4d-card-footer></c4d-card-footer>
            </c4d-card>
          `
        : ''}
    </c4d-content-group>
  `;
};

export default {
  title: 'Components/Content group',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">
            <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
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
