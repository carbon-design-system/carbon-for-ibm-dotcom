/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import '../content-block-cards';
import '../../content-block/content-block-heading';
import '../../card-group/card-group';
import '../../card-group/card-group-item';
import '../../cta/card-cta-footer';
import '../../cta/video-cta-container';

import { CTA_TYPE } from '../../cta/shared-enums';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const cardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <div slot="heading">Nunc convallis lobortis</div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-image
      slot="image"
      alt="Image alt text"
      default-src="https://fpoimg.com/1056x792?text=4:3&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image>
    <div slot="eyebrow">Topic</div>
    <div slot="heading">Natural Language Processing.</div>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithVideos = html`
  <dds-card-group-item cta-type="video" href="1_9h94wo6b">
    Test Video - 1:1
    <dds-card-cta-footer cta-type="video" slot="footer" href="1_9h94wo6b">
      0:18
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group slot="content">
        ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem}
      </dds-card-group>
      <dds-card-cta slot="cta" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        ${ArrowRight20({ slot: 'footer' })}
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

export const withImages = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group slot="content">
        ${cardGroupItemWithImages} ${cardGroupItemWithImages} ${cardGroupItemWithImages} ${cardGroupItemWithImages}
        ${cardGroupItemWithImages}
      </dds-card-group>
      <dds-card-cta slot="cta" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        ${ArrowRight20({ slot: 'footer' })}
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

export const withVideos = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group slot="content">
        ${cardGroupItemWithVideos} ${cardGroupItemWithVideos} ${cardGroupItemWithVideos} ${cardGroupItemWithVideos}
        ${cardGroupItemWithVideos}
      </dds-card-group>
      <dds-card-cta slot="cta" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        <p>${ctaCopy}</p>
        ${ArrowRight20({ slot: 'footer' })}
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

export default {
  title: 'Components/Content Block Cards',
  decorators: [
    story => html`
      <dds-video-cta-container class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </dds-video-cta-container>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentBlockCards: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum interdum'),
        ctaCopy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit ametttt'),
        ctaType: select('CTA type (cta-type)', ctaTypes, null),
        href: textNullable('Href (href):', 'https://example.com'),
      }),
    },
  },
};
