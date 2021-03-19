/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import '../../content-section/content-section';
import '../../content-section/content-section-heading';
import '../../card/card-heading';
import '../../card-group/card-group';
import '../../card-group/card-group-item';
import '../cta-block';
import '../../content-item/content-item-heading';
import '../../content-block/content-block-heading';
import '../../cta-section/cta-section-copy';
import '../cta-block-item';
import '../../cta/card-cta-footer';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';

const ctaBlockItems = [
  {
    heading: 'Intyger aliquet interdum purus',
    copy: `Nunc metus lorem, volutpat eget bibendum quis, sodales et purus.
     In rutrum magna quis orci suscipit ultrices. Quisque consequat vel nulla in ultrices.`,
    linkWithIcon1: {
      href: 'https://www.example.com',
      copy: 'Nunc sem ex',
    },
  },
  {
    heading: 'Aliquam non ante at elit',
    copy: `Intesger a interdum eros, vitae maximus felis. Augue in dictum lobortis.`,
    linkWithIcon1: {
      href: 'https://www.example.com',
      copy: 'Mauris semper leo elit',
    },
  },
  {
    heading: 'Cras ut libero et',
    copy: `Praesent sodales tempus nunc, eu posuere nibh consequat non. Quisque
     laoreet mattis facilisis. Nullam at diam sit amet nisi elementum maximus.`,
    linkWithIcon1: {
      href: 'https://www.example.com',
      copy: 'Suspendisse sodales',
    },
    linkWithIcon2: {
      href: 'https://www.example.com',
      copy: 'Nulla non mi ipsum',
    },
  },
  {
    heading: 'Suspendisse nec est efficitur',
    copy: `Sed dictum dolor sed felis convallis molestie. Nam sit amet massa felis.
     Duis finibus bibendum nisi, et blandit ante vestibulum sed. Integer pretium enim ex, et maximus enim pulvinar et.`,
    linkWithIcon1: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolar',
    },
  },
  {
    heading: 'Morbi eget placerat felis',
    copy: `Nulla at nisl turpis. Vestibulum vel tincidunt eros. Duis a tortor ex. Aenean quis finibus lorem. 
    Aliquam malesuada mauris erat.`,
    linkWithIcon1: {
      href: 'https://www.example.com',
      copy: 'Quisque consequat vel nulla',
    },
    linkWithIcon2: {
      href: 'https://www.example.com',
      copy: 'Aliquam erat volutpat',
    },
  },
];

export const Default = ({ parameters }) => {
  const { sectionHeading, secondaryHeading, supportingElement } = parameters?.props?.CtaBlock ?? {};
  return html`
    <dds-cta-block>
      <dds-content-section-heading>${ifNonNull(sectionHeading)}</dds-content-section-heading>

      <dds-content-block-heading slot="group-heading">${ifNonNull(secondaryHeading)}</dds-content-block-heading>
      <dds-cta-section-copy slot="group-copy"
        >Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose. eiusmode tempor incididunt ut.
      </dds-cta-section-copy>
      <dds-link-with-icon slot="group-cta" href="${ifNonNull(hrefDefault)}">
        Optional text link example ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>

      ${ctaBlockItems.map(
        ({ heading: itemHeading, copy: itemCopy, linkWithIcon1, linkWithIcon2 }) => html`
          <dds-cta-block-item>
            ${supportingElement === 'image'
              ? html`
                  <dds-image slot="media" alt="Image alt text" default-src="${imgLg16x9}">
                    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
                    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
                    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
                  </dds-image>
                `
              : ``}
            ${supportingElement === 'video'
              ? html`
                  <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
                `
              : ``}
            ${supportingElement === 'pictogram'
              ? html`
                  <svg
                    slot="media"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    data-autoid="dds--cta-block__pictogram"
                    aria-label="Pictogram"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    role="img"
                    class="dds--cta-block__pictogram"
                  >
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".72"
                      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v17C39,
                    31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
                    ></path>
                  </svg>
                `
              : ``}
            ${supportingElement === 'statistic'
              ? html`
                  <div class="dds--cta-block__statistic" slot="media">100%</div>
                `
              : ``}
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
            <dds-card-cta-footer href="${linkWithIcon1.href}">
              ${linkWithIcon1.copy} ${ArrowRight20({ slot: 'icon' })}
            </dds-card-cta-footer>
            ${typeof linkWithIcon2 !== 'undefined'
              ? html`
                  <dds-card-cta-footer href="${linkWithIcon2.href}">
                    ${linkWithIcon2.copy} ${ArrowRight20({ slot: 'icon' })}
                  </dds-card-cta-footer>
                `
              : ``}
          </dds-cta-block-item>
        `
      )}
    </dds-cta-block>
  `;
};

export default {
  title: 'Components/CTA Block',
  decorators: [
    (story, { parameters }) => html`
      <div class="${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-section',
    hasVerticalSpacingInComponent: true,
    knobs: {
      CtaBlock: ({ groupId }) => ({
        sectionHeading: textNullable('Heading', 'Title heading', groupId),
        secondaryHeading: textNullable(
          'Secondary Heading',
          'Optional title heading-4 color test-01 that spans to multiple lines as needed',
          groupId
        ),
        supportingElement: select('Supporting Element', ['image', 'video', 'pictogram', 'statistic', 'none'], 'image', groupId),
      }),
    },
  },
};
