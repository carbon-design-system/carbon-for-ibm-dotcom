/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit';
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
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-8 cds--no-gutter">${story()}</div>
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
    <c4d-content-group-pictograms>
      <c4d-content-group-heading>${groupHeading}</c4d-content-group-heading>
      <c4d-content-group-copy>${groupCopy}</c4d-content-group-copy>
      <div>
        ${pictogramsItems.map(
          ({ heading, copy, linkWithIcon }) => html`
            <c4d-content-item horizontal>
              <svg
                version="1.1"
                slot="media"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                stroke="currentColor"
                x="0px"
                y="0px"
                width="64"
                height="64"
                viewBox="8 8 32 32"
                xml:space="preserve">
                <g>
                  <g>
                    <path
                      style="fill:none;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
                      d="M15,29H9V10h25v19h-7
                    M34,26h-7 M15,26H9 M30,29v8h9V21h-5 M30,34h9 M20.998,27.621c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v2.378
                    l-0.005-6.962c0-0.573-0.447-1.037-0.998-1.037S17,22.464,17,23.037v5.882v4.924C17,36.139,18.792,38,21.002,38
                    S25,36.121,25,33.842v-5.04c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v1.196l-0.005-1.935
                    c0-0.573-0.447-1.037-0.998-1.037s-1.002,0.464-1.002,1.037l0.004,1.935L20.998,27.621z" />
                  </g>
                </g>
                <g></g>
              </svg>
              <c4d-content-item-heading>${heading}</c4d-content-item-heading>
              <c4d-content-item-copy>${copy}</c4d-content-item-copy>
              <c4d-link-with-icon
                href="${linkWithIcon.href}"
                slot="footer"
                cta-type="local">
                ${linkWithIcon.copy}
              </c4d-link-with-icon>
            </c4d-content-item>
          `
        )}
      </div>
    </c4d-content-group-pictograms>
  `;
};
