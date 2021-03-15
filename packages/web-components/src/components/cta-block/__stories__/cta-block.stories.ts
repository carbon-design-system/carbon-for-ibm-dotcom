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
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import '../../content-section/content-section';
import '../../content-section/content-section-heading';
import '../../card/card-heading';
import '../../card-group/card-group';
import '../../card-group/card-group-item';
import '../cta-block';
import '../../content-item/content-item-heading';
import '../cta-block-item';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--001.jpg';
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
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    data-autoid="dds--pictogram-item__pictogram"
    aria-label="Pictogram description"
    viewBox="0 0 32 32"
    role="img"
    class="bx--promo-item__pictogram"
  >
    <path
      d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 
          25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 
          0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 
          0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 
          0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 
          0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 
          0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 
          0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 
          0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 
          0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 
          27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 
          7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 
          0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
    />
    <path fill="none" d="M0 0h32v32H0z" />
  </svg>
`;

const statistic = html`
  <div>100%</div>
`;

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';

const ctaBlockItems = [
  {
    heading: 'End-to-end IT management',
    statistic: '96%',
    copy: `Manage and orchestrate your hybrid multicloud infrastructure
    with the most secure, reliable and flexible servers available today.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore hybrid cloud infrastructure',
    },
  },
  {
    heading: 'Secure data and workloads',
    statistic: '43%',
    copy: `Protect data beyond the platform and achieve regulatory compliance 
    and resiliency with exceptional data security and privacy capabilities.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore infrastructure security',
    },
  },
  {
    heading: 'Flexible deployment',
    statistic: '64%',
    copy: `Build once, run anywhere with flexible open compute solutions that 
    support multiple Linux distributions, plus industry-leading cloud-native deployment.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Explore scale-out servers',
    },
  },
  {
    heading: 'Suspendisse nec est efficitur',
    statistic: '2.5B',
    copy: `Manage and orchestrate your hybrid multicloud infrastructure with 
    the most secure, reliable and flexible servers available today.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolar',
    },
  },
  {
    heading: 'Morbi eget placerat felis',
    statistic: '5.00hrs',
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
  title: 'Components/Cta Block',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      CtaBlock: ({ groupId }) => ({
        mediaType: select('mediaType (optional)', ['image', 'video', 'pictogram', 'statistic', 'none'], 'image', groupId),
        sectionHeading: textNullable('Heading (required)', 'Title heading', groupId),
        secondaryHeading: textNullable(
          'Secondary Heading (optional)',
          'Optional title heading-4 color test-01 that spans to multiple lines as needed',
          groupId
        ),
      }),
    },
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass} bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
};
