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
import '../cta-block-item';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

const image = html`
  <dds-image slot="media" alt="Image alt text" default-src="${imgLg16x9}">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image>
`;

const video = html`
  <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
`;

const pictogram = html`
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
      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
    ></path>
  </svg>
`;

const statistic = html`
  <span class="dds--cta-block__statistic" slot="media">100%</span>
`;

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';

const ctaBlockItems = [
  {
    heading: 'End-to-end IT management',
    copy: `Manage and orchestrate your hybrid multicloud infrastructure
    with the most secure, reliable and flexible servers available today.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore hybrid cloud infrastructure',
    },
  },
  {
    heading: 'Secure data and workloads',
    copy: `Protect data beyond the platform and achieve regulatory compliance 
    and resiliency with exceptional data security and privacy capabilities.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore infrastructure security',
    },
  },
  {
    heading: 'Flexible deployment',
    copy: `Build once, run anywhere with flexible open compute solutions that 
    support multiple Linux distributions, plus industry-leading cloud-native deployment.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore scale-out servers',
    },
  },
  {
    heading: 'Suspendisse nec est efficitur',
    copy: `Manage and orchestrate your hybrid multicloud infrastructure with 
    the most secure, reliable and flexible servers available today.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolar',
    },
  },
  {
    heading: 'Morbi eget placerat felis',
    copy: `Manage and orchestrate your hybrid multicloud infrastructure with 
    the most secure, reliable and flexible servers available today.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolar',
    },
  },
];

export const Default = ({ parameters }) => {
  const { sectionHeading, secondaryHeading, mediaType } = parameters?.props?.CtaBlock ?? {};
  return html`
    <dds-cta-block>
      <dds-content-section-heading>${ifNonNull(sectionHeading)}</dds-content-section-heading>

      <dds-content-group slot="group-heading">
        <dds-content-group-heading>${ifNonNull(secondaryHeading)}</dds-content-group-heading>
        <dds-content-group-copy
          >Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose. eiusmode tempor incididunt
          ut.</dds-content-group-copy
        >
        <dds-link-with-icon slot="footer" href="${ifNonNull(hrefDefault)}">
          Optional text link example ${ArrowRight20({ slot: 'icon' })}
        </dds-link-with-icon>
      </dds-content-group>

      ${ctaBlockItems.map(
        ({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => html`
          <dds-cta-block-item>
            ${mediaType === 'image' ? image : ``} ${mediaType === 'video' ? video : ``}
            ${mediaType === 'pictogram' ? pictogram : ``} ${mediaType === 'statistic' ? statistic : ``}
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
            <dds-link-with-icon href="${linkWithIcon.href}" slot="footer">
              ${linkWithIcon.copy} ${ArrowRight20({ slot: 'icon' })}
            </dds-link-with-icon>
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
    gridContentClasses: 'bx--grid dds-ce-demo-devenv--simple-grid--content-layout',
    hasVerticalSpacingInComponent: true,
    knobs: {
      CtaBlock: ({ groupId }) => ({
        sectionHeading: textNullable('Heading', 'Title heading', groupId),
        secondaryHeading: textNullable(
          'Secondary Heading',
          'Optional title heading-4 color test-01 that spans to multiple lines as needed',
          groupId
        ),
        mediaType: select('Media Type', ['image', 'video', 'pictogram', 'statistic', 'none'], 'image', groupId),
      }),
    },
  },
};
