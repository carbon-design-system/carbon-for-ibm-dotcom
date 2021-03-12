/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../content-group-pictograms';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../pictogram-item/pictogram-item';
import '../../content-group/content-group-copy';
import '../../content-item/content-item-copy';
import '../../content-item/content-item-heading';
import styles from './content-group-pictograms.stories.scss';

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

export default {
  title: 'Components/Content Group Pictograms',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentGroupPictograms: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable(
          'Copy text (copy)',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading: groupHeading, copy: groupCopy } = parameters?.props?.ContentGroupPictograms ?? {};
  return html`
    <dds-content-group-pictograms>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>
      <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
      ${pictogramsItems.map(
        ({ heading, copy, linkWithIcon }) => html`
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
            <dds-content-item-heading>${heading}</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
            <dds-link-with-icon href="${linkWithIcon.href}" slot="footer">
              ${linkWithIcon.copy} ${ArrowRight20({ slot: 'icon' })}
            </dds-link-with-icon>
          </dds-pictogram-item>
        `
      )}
    </dds-content-group-pictograms>
  `;
};
