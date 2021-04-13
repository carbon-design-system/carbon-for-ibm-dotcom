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
import '../../cta-block/cta-block';
import '../../cta-block/cta-block-item-row';
import '../../cta-block/cta-block-item';
import '../../content-item/content-item';
import '../../content-item/content-item-copy';
import '../../content-item/content-item-heading';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';
import '../../cta/link-list-item-cta';
import '../../video-player/video-player-container';
import '../../lightbox-media-viewer/lightbox-video-player-container';

import styles from './cta-section.stories.scss';

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
  const { heading, copy } = parameters?.props?.CTASection ?? {};

  return html`
    <dds-cta-section>
      <dds-content-section-heading>Related products and services</dds-content-section-heading>

      <dds-cta-block>
        <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
        <dds-content-block-copy>${copy}</dds-content-block-copy>
        <dds-text-cta slot="action" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>

        <dds-cta-block-item-row no-border>
          <dds-cta-block-item>
            <span slot="statistics">10%</span>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">11%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">12%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row no-border>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              slot="media"
              hide-caption
              playing-mode="lightbox"
            >
            </dds-video-player-container>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              playing-mode="lightbox"
              slot="media"
              hide-caption
            ></dds-video-player-container>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
      </dds-cta-block>
    </dds-cta-section>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

export const ContentSectionHeaderOnly = () => {
  return html`
    <dds-cta-section>
      <dds-content-section-heading>Related products and services</dds-content-section-heading>

      <dds-cta-block>
        <dds-cta-block-item-row no-border>
          <dds-cta-block-item>
            <span slot="statistics">10%</span>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">11%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">12%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row no-border app cogni>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              playing-mode="lightbox"
              slot="media"
              hide-caption
            ></dds-video-player-container>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              playing-mode="lightbox"
              slot="media"
              hide-caption
            ></dds-video-player-container>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
      </dds-cta-block>
    </dds-cta-section>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

export const NoContentSectionHeading = ({ parameters }) => {
  const { heading, copy } = parameters?.props?.CTASection ?? {};

  return html`
    <dds-cta-section>
      <dds-cta-block>
        <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
        <dds-content-block-copy>${copy}</dds-content-block-copy>
        <dds-text-cta slot="action" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>

        <dds-cta-block-item-row no-border>
          <dds-cta-block-item>
            <span slot="statistics">10%</span>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">11%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>

          <dds-cta-block-item>
            <span slot="statistics">12%</span>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
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
              class="bx--pictogram-item__pictogram"
            >
              <path
                fill="none"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width=".72"
                d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
              ></path>
            </svg>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
        <dds-cta-block-item-row no-border app cogni>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              playing-mode="lightbox"
              slot="media"
              hide-caption
            ></dds-video-player-container>
            <dds-content-item-heading>Get connected</dds-content-item-heading>
            <dds-content-item-copy
              >IBM DevOps partners have a wide range of expertise. Find one to build that right solution for
              you.</dds-content-item-copy
            >
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Find a partner</dds-text-cta>
          </dds-cta-block-item>
          <dds-cta-block-item>
            <dds-video-player-container
              video-id="1_9h94wo6b"
              aspect-ratio="4x3"
              playing-mode="lightbox"
              slot="media"
              hide-caption
            ></dds-video-player-container>
            <dds-content-item-heading>Learn how</dds-content-item-heading>
            <dds-content-item-copy>Dig into more self-directed larning about DevOps methodologies.</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
          </dds-cta-block-item>
        </dds-cta-block-item-row>
      </dds-cta-block>
    </dds-cta-section>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

export default {
  title: 'Components/CTA Section',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      ${story()}
    `,
  ],
  parameters: {
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Optional title heading-05 color text-01', groupId),
        copy: textNullable(
          'Copy text (copy)',
          'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
          groupId
        ),
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default, groupId) ?? 0],
      }),
    },
    ...readme.parameters,
  },
};
