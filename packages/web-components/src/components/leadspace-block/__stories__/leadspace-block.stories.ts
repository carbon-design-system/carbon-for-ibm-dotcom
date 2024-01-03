/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { text, boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import Download20 from '../../../internal/vendor/@carbon/web-components/icons/download/20';

import '../index';
import '../../link-list/index';
import '../../video-player/video-player-container';
import '../../button/button';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--004.jpg';

import readme from './README.stories.mdx';

const image = html`
  <c4d-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </c4d-image-item>
  </c4d-image>
`;

const video = html`
  <c4d-video-player-container
    video-id="0_ibuqxqbe"></c4d-video-player-container>
`;

const linkList = html`
  <c4d-link-list>
    <c4d-link-list-heading>Featured products</c4d-link-list-heading>
    <c4d-link-list-item href="https://example.com">
      IBM Cloud Continuous Delivery ${ArrowRight20({ slot: 'icon' })}
    </c4d-link-list-item>
    <c4d-link-list-item href="https://example.com">
      UrbanCode ${ArrowRight20({ slot: 'icon' })}
    </c4d-link-list-item>
    <c4d-link-list-item href="https://example.com">
      View all products ${Download20({ slot: 'icon' })}
    </c4d-link-list-item>
  </c4d-link-list>
`;

const buttonCTA = html`
  <c4d-button cta-type="local" href="https://example.com">
    Contact sales
  </c4d-button>
`;

export const Default = (args) => {
  const { title, copy, media, border, highlight } = args?.LeadSpaceBlock ?? {};
  return html`
    <c4d-leadspace-block ?border=${border}>
      <c4d-leadspace-heading
        highlight="${highlight}"
        type-style="fluid-heading-05"
        >${title}</c4d-leadspace-heading
      >
      <c4d-leadspace-block-content>
        <c4d-content-block-copy>${copy}</c4d-content-block-copy>
        ${media !== 'none'
          ? html` <c4d-leadspace-block-media>
              ${media === 'image' ? image : media === 'video' ? video : ''}
            </c4d-leadspace-block-media>`
          : ``}
        ${linkList} ${buttonCTA}
      </c4d-leadspace-block-content>
    </c4d-leadspace-block>
  `;
};

export default {
  title: 'Components/Lead space block',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-8">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadSpaceBlock: () => ({
        title: text(
          'title (title)',
          'Infuse your AIOps platform with intelligent IT operations'
        ),
        highlight: text('Highlight:', 'intelligent IT operations'),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
        media: select('Media:', ['none', 'image', 'video'], 'image'),
        border: boolean('Border:', true),
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
