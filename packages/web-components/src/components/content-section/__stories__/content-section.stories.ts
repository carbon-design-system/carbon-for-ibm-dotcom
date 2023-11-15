/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean, select } from '@storybook/addon-knobs';
import '../index';
import '../../card-group/index';
import '../../carousel/index';
import '../../content-group-cards/index';
import '../../content-block-simple/index';
import '../../cta/text-cta';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import * as components from '../../content-block/__stories__/data/content.js';

const currentComponents = [
  'Callout quote',
  'Callout with media',
  'Card group',
  'Card in card',
  'Carousel',
  'Content block',
  'Content group',
  'Content item row',
  'Content item',
  'CTA block',
  'Feature card',
  'Image',
  'Link list',
  'Quote',
  'Structured list',
  'Tabs extended',
  'Video player',
];

const componentVariables = {
  'Callout quote': components.calloutQuote,
  'Callout with media': components.calloutWithMedia,
  'Card group': components.cardGroup,
  'Card in card': components.cardInCard,
  'Carousel': components.carousel,
  'Content block': components.contentBlock,
  'Content group': components.contentGroup,
  'Content item row': components.contentItemRowStory,
  'Content item': components.contentItem,
  'CTA block': components.ctaBlock,
  'Feature card': components.featureCard,
  'Image': components.image,
  'Link list': components.linkList,
  'Quote': components.quote,
  'Structured list': components.structuredList,
  'Tabs extended': components.tabsExtended,
  'Video player': components.videoPlayer,
};

export const Default = (args) => {
  const { heading, border, child, copy } = args?.ContentSection ?? {};
  
  const classes = child.includes('Content block')
    ? 'cds--col-lg-16 cds--no-gutter'
    : '';

  const childStory = componentVariables[child]

  return html`
    <c4d-content-section ?border=${border} children-custom-class="${classes}">
      <c4d-content-section-heading
        >${ifDefined(heading)}</c4d-content-section-heading
      >
      <c4d-content-section-copy>${ifDefined(copy)}</c4d-content-section-copy>
      ${childStory}
      <c4d-text-cta
        slot="footer"
        cta-type="local"
        href="https://www.example.com"
        >Link action</c4d-text-cta
      >
    </c4d-content-section>
  `;
};

export default {
  title: 'Components/Content section',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-16 cds--no-gutter">
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
      escapeHTML: false,
      ContentSection: () => ({
        heading: textNullable(
          'Heading:',
          'Speech recognition (statistical Artificial Intelligence)'
        ),
        border: boolean(
          'Border',
          false
        ),     
        child: select('Child component:', currentComponents, 'Callout quote'),
        copy: textNullable(
          'Copy:',
          "AI features for understanding speech can be trained for a specific speaker's voice."
        ),
      }),
    },
    propsSet: {
      default: {
        ContentSection: {
          heading: 'Speech recognition (statistical Artificial Intelligence)',
          border: false,
          copy: "AI features for understanding speech can be trained for a specific speaker's voice.",
          addChildren: '',
        },
      },
    },
  },
};
