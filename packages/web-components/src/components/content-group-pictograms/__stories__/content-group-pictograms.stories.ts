/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
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
  title: 'Components/Content group pictograms',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-8 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupPictograms: () => ({
        heading: textNullable(
          'Heading (heading)',
          'Lorem ipsum dolor sit amet'
        ),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
      }),
    },
    propsSet: {
      default: {
        ContentGroupPictograms: {
          heading: 'Lorem ipsum dolor sit amet',
          copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
        },
      },
    },
  },
};

export const Default = (args) => {
  const { heading: groupHeading, copy: groupCopy } =
    args?.ContentGroupPictograms ?? {};
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
              width="64"
              height="64"
              viewBox="8 8 32 32"
              xml:space="preserve"
            >
              <g>
                <g>
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
              <g></g>
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
