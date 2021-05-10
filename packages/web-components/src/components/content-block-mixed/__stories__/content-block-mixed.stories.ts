/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../content-block/content-block-copy';
import '../../content-group/content-group-heading';
import '../../content-group/content-group-copy';
import '../../content-group-cards/content-group-cards';
import '../../content-group-cards/content-group-cards-item';
import '../../content-item/content-item-copy';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../card/card-heading';
import '../content-block-mixed';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--001.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import styles from './content-block-mixed.stories.scss';
import { CTA_TYPE } from '../../cta/defs';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/defs';

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

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const complementaryStyleSchemes = {
  'Regular style scheme': null,
  // eslint-disable-next-line max-len
  [`With border (${CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER})`]: CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

const image = ({ heading: imageHeading } = { heading: undefined }) => html`
  <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="${ifNonNull(imageHeading)}">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image-with-caption>
`;

export default {
  title: 'Components/Content block mixed',
  decorators: [
    (story, { parameters }) => html`
      <style>
        ${styles}
      </style>
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout',
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: textNullable(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          groupId
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading, ctaType } = parameters?.props?.ContentBlockMixed ?? {};
  return html`
    <dds-content-block-mixed>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy>${groupCopy}</dds-content-block-copy>
      <dds-content-group-cards>
        <dds-content-group-heading>${cardsGroupHeading}</dds-content-group-heading>
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
        <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
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
                      style="fill:none;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
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
        <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
        ${image({ heading })}
        <dds-card-cta slot="footer" cta-type=${ctaType} href="https://example.com">
          Lorem ipsum dolor sit amet
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-card-cta>
      </dds-content-group-simple>
    </dds-content-block-mixed>
  `;
};

export const WithAsideElements = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading, complementaryStyleScheme, ctaType, linkListHeading } =
    parameters?.props?.ContentBlockMixed ?? {};
  return html`
    <dds-content-block-mixed complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy>${groupCopy}</dds-content-block-copy>
      <dds-content-group-cards>
        <dds-content-group-heading>${cardsGroupHeading}</dds-content-group-heading>
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
        <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
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
                      style="fill:none;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
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
        <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
        ${image({ heading })}
        <dds-card-cta slot="footer" cta-type=${ctaType} href="https://example.com">
          Lorem ipsum dolor sit amet
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-card-cta>
      </dds-content-group-simple>
      <dds-link-list type="default" slot="complementary">
        <dds-link-list-heading>${linkListHeading}</dds-link-list-heading>
        <dds-link-list-item-card-cta href="https://example.com" cta-type="local">
          <p>Containerization A Complete Guide</p>
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-link-list-item-card-cta>
        <dds-link-list-item-card-cta href="https://example.com" cta-type="external">
          <p>Why should you use microservices and containers</p>
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-link-list-item-card-cta>
      </dds-link-list>
    </dds-content-block-mixed>
  `;
};

WithAsideElements.story = {
  parameters: {
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout--with-complementary',
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: textNullable(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          groupId
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId),
        linkListHeading: textNullable('Link list heading (heading)', 'Tutorials', groupId),
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null,
          groupId
        ),
      }),
    },
  },
};
