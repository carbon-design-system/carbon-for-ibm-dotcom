/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import Launch20 from 'carbon-web-components/es/icons/launch/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../button-group/button-group-item';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../cta-section';
import '../cta-section-copy';
import '../cta-section-item';
import '../cta-section-item-heading';
import '../cta-section-item-copy';
import '../../cta-block/cta-block-item';
import '../../cta-block/cta-block';
import '../../content-item/content-item';
import '../../content-item/content-item-copy';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-paragraph';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  Launch20: Launch20({ slot: 'icon' }),
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

export const Default = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${copy}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
    </dds-cta-section>
  `;
};

export const WithContentItems = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
        <dds-cta-section-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
          you.</dds-cta-section-item-copy
        >
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
      </dds-cta-section-item>

      <dds-cta-section-item>
        <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
        <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
      </dds-cta-section-item>
    </dds-cta-section>
  `;
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-section>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-cta-section-copy>${ifNonNull(copy)}</dds-cta-section-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-link-list slot="link-list" type="end">
        <dds-link-list-heading>More ways to explore DevOps</dds-link-list-heading>
        <dds-link-list-item href="https://example.com">
          Events ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Blogs ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Training ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Developer resources ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Research ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          News ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-cta-section>
  `;
};

export const CtaBlock = ({ parameters }) => {
  const { sectionHeading, secondaryHeading, supportingElement } = parameters?.props?.CTASection ?? {};
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
            <dds-link-with-icon href="${linkWithIcon.href}" slot="footer">
              ${linkWithIcon.copy} ${ArrowRight20({ slot: 'icon' })}
            </dds-link-with-icon>
          </dds-cta-block-item>
        `
      )}
    </dds-cta-block>
  `;
};

CtaBlock.story = {
  parameters: {
    gridContentClasses: 'bx--grid dds-ce-demo-devenv--simple-grid--content-layout',
    knobs: {
      CTASection: ({ groupId }) => ({
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

export default {
  title: 'Components/CTA Section',
  decorators: [
    (story, { parameters }) => html`
      <div class="${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout',
    hasVerticalSpacingInComponent: true,
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Take the next step', groupId),
        copy: textNullable(
          'Copy text (copy)',
          'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
          groupId
        ),
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default, groupId) ?? 0],
      }),
    },
    ...readme.parameters,
  },
};
