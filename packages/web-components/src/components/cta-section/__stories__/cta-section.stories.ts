/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, number, boolean } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../link-list/index';
import '../index';
import '../../video-player/video-player-container';
import '../../lightbox-media-viewer/lightbox-video-player-container';
import '../../content-section/index';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';

import content from './content';

const contentItemTypeMap = {
  text: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        (elem) =>
          html`
            <dds-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="${elem.href}"
              >${elem.copy}</dds-text-cta
            >
          `
      )}
    </dds-cta-block-item>
  `,
  statistics: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <span slot="statistics">10%</span>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        (elem) =>
          html`
            <dds-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="${elem.href}"
              >${elem.copy}</dds-text-cta
            >
          `
      )}
    </dds-cta-block-item>
  `,
  pictogram: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <svg
        slot="media"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        data-autoid="dds--pictogram-item__pictogram"
        aria-label="Pictogram description"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        role="img"
        class="bx--pictogram-item__pictogram">
        <path
          fill="none"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="1.10581"
          d="M 44.211009,36.137939 H 3.7889912 c -1.7101623,0 -3.10938596,-1.365518
          -3.10938596,-3.034485 V 7.3103341 c 0,-1.6689666 1.39922366,-3.0344847 3.10938596,-3.0344847 H 44.211009 c 1.710162,0
          3.109386,1.3655181 3.109386,3.0344847 V 33.103454 c 0,1.668967 -1.399224,3.034485 -3.109386,3.034485 z m
          -31.09386,7.586212 H 34.882851 M 24,36.137939 v 7.586212 M 0.67960524,28.551727 H 47.320395" />
      </svg>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        (elem) =>
          html`
            <dds-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="${elem.href}"
              >${elem.copy}</dds-text-cta
            >
          `
      )}
    </dds-cta-block-item>
  `,
  media: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <dds-video-player-container
        video-id="1_9h94wo6b"
        aspect-ratio="4x3"
        slot="media"
        hide-caption
        playing-mode="lightbox">
      </dds-video-player-container>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        (elem) =>
          html`
            <dds-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="${elem.href}"
              >${elem.copy}</dds-text-cta
            >
          `
      )}
    </dds-cta-block-item>
  `,
  logo: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <dds-image-logo
        alt="Microsoft logo"
        slot="media"
        default-src="${logoMicrosoft2x1}"></dds-image-logo>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        (elem) =>
          html`
            <dds-text-cta
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="${elem.href}"
              >${elem.copy}</dds-text-cta
            >
          `
      )}
    </dds-cta-block-item>
  `,
};

const contentItemTypeOptions = {
  Text: 'text',
  Statistics: 'statistics',
  Pictogram: 'pictogram',
  Media: 'media',
  Logo: 'logo',
};

const renderItems = (item, count) => {
  return html`
    <dds-cta-block-item-row>
      ${count.map((_, index) => item({ ...content[index] }))}
    </dds-cta-block-item-row>
  `;
};

export const Simple = (args) => {
  const { heading, copy, showText, showCta, border } = args?.CTASection ?? {};

  return html`
    <dds-cta-section>
      <dds-cta-block ?no-border="${!border}">
        <dds-content-block-heading
          >${ifDefined(heading)}</dds-content-block-heading
        >
        ${showText
          ? html`
              <dds-content-block-copy
                >${ifDefined(copy)}</dds-content-block-copy
              >
            `
          : ''}
        ${showCta
          ? html`
              <dds-text-cta
                slot="action"
                cta-type="local"
                icon-placement="right"
                href="example.com"
                >Browse tutorials</dds-text-cta
              >
            `
          : ''}
      </dds-cta-block>
    </dds-cta-section>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

export const WithContentItems = (args) => {
  const { heading, copy, showText, showCta, border } = args?.CTASection ?? {};
  const { contentItemType, contentItemCount, logoAspectRatio } =
    args?.WithContentItems ?? {};

  const contentItem = contentItemTypeMap[contentItemType];

  return html`
    <dds-cta-section logo-ratio="${ifDefined(logoAspectRatio)}">
      <dds-content-section-heading
        >Related products and services</dds-content-section-heading
      >
      <dds-cta-block ?no-border="${!border}">
        <dds-content-block-heading
          >${ifDefined(heading)}</dds-content-block-heading
        >
        ${showText
          ? html`
              <dds-content-block-copy
                >${ifDefined(copy)}</dds-content-block-copy
              >
            `
          : ''}
        ${showCta
          ? html`
              <dds-text-cta
                slot="action"
                cta-type="local"
                icon-placement="right"
                href="example.com"
                >Browse tutorials</dds-text-cta
              >
            `
          : ''}
        ${renderItems(contentItem, contentItemCount)}
      </dds-cta-block>
    </dds-cta-section>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      WithContentItems: () => {
        const contentItemType = select(
          'Content item type',
          contentItemTypeOptions,
          contentItemTypeOptions.Text
        );

        const logoAspectRatio =
          contentItemType !== contentItemTypeOptions.Logo
            ? undefined
            : select('Logo aspect ratio', ['2:1', '1:1'], '2:1');
        return {
          contentItemType,
          contentItemCount: Array.from({
            length: number('Number of content items', 3, { min: 2, max: 6 }),
          }),
          logoAspectRatio,
        };
      },
    },
    propsSet: {
      default: {
        WithContentItems: {
          contentItemType: contentItemTypeMap[contentItemTypeOptions.Text],
          contentItemCount: Array(3),
        },
      },
    },
  },
};

export const WithLinkList = (args) => {
  const { heading, copy, showText, showCta, border } = args?.CTASection ?? {};

  return html`
    <dds-cta-section>
      <dds-content-section-heading
        >Related products and services</dds-content-section-heading
      >
      <dds-cta-block ?no-border="${!border}">
        <dds-content-block-heading
          >${ifDefined(heading)}</dds-content-block-heading
        >
        ${showText
          ? html`
              <dds-content-block-copy
                >${ifDefined(copy)}</dds-content-block-copy
              >
            `
          : ''}
        ${showCta
          ? html`
              <dds-text-cta
                slot="action"
                cta-type="local"
                icon-placement="right"
                href="example.com"
                >Browse tutorials</dds-text-cta
              >
            `
          : ''}
        <dds-link-list slot="link-list" type="end">
          <dds-link-list-heading
            >More ways to explore DevOps</dds-link-list-heading
          >
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
      </dds-cta-block>
    </dds-cta-section>
  `;
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    propsSet: {
      default: {
        CTASection: {
          heading: 'Optional title heading-05 color text-01',
          copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
          boolean: false,
        },
      },
    },
  },
};

export default {
  title: 'Components/CTA section',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    knobs: {
      CTASection: () => ({
        heading: textNullable(
          'Heading (required)',
          'Optional title heading-05 color text-01'
        ),
        copy: textNullable(
          'Copy text (optional)',
          'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.'
        ),
        showText: boolean('Add Copy', true),
        showCta: boolean('Add CTA', true),
        border: boolean('CTA Block border', false),
      }),
    },
    propsSet: {
      default: {
        CTASection: {
          heading: 'Optional title heading-05 color text-01',
          copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
          showText: true,
          showCta: true,
          boolean: false,
        },
      },
    },
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
