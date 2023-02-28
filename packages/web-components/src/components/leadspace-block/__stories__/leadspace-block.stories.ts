/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { text } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import Download20 from '../../../internal/vendor/@carbon/web-components/icons/download/20';

import '../index';
import '../../link-list/index';
import '../../video-player/video-player-container';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';

import readme from './README.stories.mdx';
import styles from './leadspace-block.stories.scss';

const image = html`
  <dds-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </dds-image-item>
  </dds-image>
`;

const linkList = html`
  <dds-link-list type="end">
    <dds-link-list-heading aria-level="3"
      >Featured products</dds-link-list-heading
    >
    <dds-link-list-item href="https://example.com">
      IBM Cloud Continuous Delivery ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item href="https://example.com">
      UrbanCode ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item href="https://example.com">
      View all products ${Download20({ slot: 'icon' })}
    </dds-link-list-item>
  </dds-link-list>
`;

const buttonCTA = html`
  <dds-leadspace-block-cta>
    <dds-button-group-item href="www.ibm.com"
      >Contact sales ${ArrowRight20({ slot: 'icon' })}</dds-button-group-item
    >
  </dds-leadspace-block-cta>
`;

export const Default = (args) => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return html`
    <dds-leadspace-block>
      <dds-leadspace-block-heading>${title}</dds-leadspace-block-heading>
      <dds-leadspace-block-content>
        <dds-content-block-heading>${heading}</dds-content-block-heading>
        <dds-content-block-copy>${copy}</dds-content-block-copy>
        <dds-leadspace-block-media slot="media"
          >${image}</dds-leadspace-block-media
        >
        ${linkList} ${buttonCTA}
      </dds-leadspace-block-content>
    </dds-leadspace-block>
  `;
};

export const WithVideo = (args) => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return html`
    <dds-leadspace-block>
      <dds-leadspace-block-heading>${title}</dds-leadspace-block-heading>
      <dds-leadspace-block-content>
        <dds-content-block-heading>${heading}</dds-content-block-heading>
        <dds-content-block-copy>${copy}</dds-content-block-copy>
        <dds-leadspace-block-media slot="media"
          ><dds-video-player-container
            video-id="1_9h94wo6b"></dds-video-player-container
        ></dds-leadspace-block-media>
        ${linkList} ${buttonCTA}
      </dds-leadspace-block-content>
    </dds-leadspace-block>
  `;
};

WithVideo.story = {
  name: 'With video',
};

export default {
  title: 'Components/Lead space block',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-9 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadSpaceBlock: () => ({
        title: text('title (title)', 'Continuous delivery'),
        heading: text(
          'heading (required):',
          'Innovate like a startup and scale for the enterprise '
        ),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
      }),
    },
    propsSet: {
      default: {
        LeadSpaceBlock: {
          title: 'Continuous delivery',
          heading: 'Innovate like a startup and scale for the enterprise ',
          copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
        },
      },
    },
  },
};
