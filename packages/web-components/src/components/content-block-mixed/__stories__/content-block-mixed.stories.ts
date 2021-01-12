/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/card-heading';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--001.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat
libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const pictogramsItems = [
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
];

const image = ({ heading: imageHeading } = { heading: undefined }) => html`
  <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="${ifNonNull(imageHeading)}">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image-with-caption>
`;

export default {
  title: 'Components/Content Block Mixed',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Copy text (copy)', copy, groupId),
        cardsGroupHeading: textNullable(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading } = parameters?.props?.ContentBlockMixed ?? {};
  return html`
    <dds-content-block-mixed>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-paragraph>${groupCopy}</dds-content-block-paragraph>
      <dds-content-group-cards>
        <dds-content-group-heading>${cardsGroupHeading}</dds-content-group-heading>
        <p slot="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <dds-content-group-cards-item href="www.ibm.com">
          <dds-card-heading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </dds-card-heading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <dds-card-footer icon-placement="left">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-footer>
        </dds-content-group-cards-item>
        <dds-content-group-cards-item href="www.ibm.com">
          <dds-card-heading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </dds-card-heading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <dds-card-footer icon-placement="left">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-footer>
        </dds-content-group-cards-item>
      </dds-content-group-cards>
      <dds-content-group-pictograms>
        <dds-content-group-heading>${heading}</dds-content-group-heading>
        <dds-content-item-copy>${groupCopy}</dds-content-item-copy>
        ${pictogramsItems.map(
          ({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => html`
            <dds-pictogram-item>
              <svg
                version="1.1"
                slot="pictogram"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                style="enable-background:new 0 0 48 48;"
                xml:space="preserve"
              >
                <g id="touch_screen">
                  <g id="touch_screen_1_">
                    <path
                      style="fill:none;stroke:#000000;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
                      d="M15,29H9V10h25v19h-7
                      M34,26h-7 M15,26H9 M30,29v8h9V21h-5 M30,34h9 M20.998,27.621c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v2.378
                      l-0.005-6.962c0-0.573-0.447-1.037-0.998-1.037S17,22.464,17,23.037v5.882v4.924C17,36.139,18.792,38,21.002,38
                      S25,36.121,25,33.842v-5.04c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v1.196l-0.005-1.935
                      c0-0.573-0.447-1.037-0.998-1.037s-1.002,0.464-1.002,1.037l0.004,1.935L20.998,27.621z"
                    />
                  </g>
                </g>
                <g id="Layer_1"></g>
              </svg>
              <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
              <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
              <dds-link-with-icon href="${linkWithIcon.href}" slot="footer">
                ${linkWithIcon.copy} ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-pictogram-item>
          `
        )}
      </dds-content-group-pictograms>
      <dds-content-group-simple>
        <dds-content-group-heading>${heading}</dds-content-group-heading>
        <dds-content-item-copy>${groupCopy}</dds-content-item-copy>
        ${image({ heading })}
        <dds-card-cta slot="footer" cta-type="local" href="https://example.com">
          Lorem ipsum dolor sit amet
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-card-cta>
      </dds-content-group-simple>
    </dds-content-block-mixed>
  `;
};
