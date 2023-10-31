/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import '../../card/index';
import '../../cta/index';
import '../../image/index';
import '../index';
import styles from './carousel.stories.scss';
import readme from './README.stories.mdx';

import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
  image = undefined,
} = {}) => html`
  <c4d-card href="${ifDefined(href)}" cta-type="local">
    <c4d-card-heading>${heading}</c4d-card-heading>
    <p>${copy}</p>
    ${image
      ? html`
          <c4d-image
            slot="image"
            alt="example image"
            default-src="${image}"></c4d-image>
        `
      : null}
    <c4d-card-footer></c4d-card-footer>
  </c4d-card>
`;

const CardWithLongHeading = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
  image = undefined,
} = {}) => html`
  <c4d-card href="${ifDefined(href)}" cta-type="local">
    <c4d-card-heading>${heading}</c4d-card-heading>
    <p>${copy}</p>
    ${image
      ? html`
          <c4d-image
            slot="image"
            alt="example image"
            default-src="${image}"></c4d-image>
        `
      : null}
    <c4d-card-footer></c4d-card-footer>
  </c4d-card>
`;

const CardWithVideo = ({ copy = copyDefault, href = hrefDefault } = {}) => html`
  <c4d-video-cta-container>
    <c4d-card cta-type="video" href="${href}">
      <p>${copy}</p>
      <c4d-card-footer> </c4d-card-footer>
    </c4d-card>
  </c4d-video-cta-container>
`;

export const Default = (args) => {
  const { mediaType } = args?.Carousel ?? {};
  switch (mediaType) {
    case 'images':
      return html`
        ${Card({ image: imgLg2x1 })}${Card({
          image: imgLg2x1,
          copy: copyOdd,
        })}${Card({ image: imgLg2x1 })}${Card({
          image: imgLg2x1,
          copy: copyOdd,
        })}${Card({ image: imgLg2x1 })}
      `;
    case 'videos':
      return html`
        ${CardWithVideo({ href: '0_ibuqxqbe' })}${CardWithVideo({
          href: '0_ibuqxqbe',
        })}${CardWithVideo({ href: '0_ibuqxqbe' })}${CardWithVideo({
          href: '0_ibuqxqbe',
        })}
      `;
    case 'mixed':
      return html`
        ${Card({ image: imgLg4x3 })}${CardWithVideo({
          href: '0_ibuqxqbe',
        })}${Card({ image: imgLg4x3 })}${CardWithVideo({
          href: '0_ibuqxqbe',
        })}${Card({ image: imgLg4x3 })}${CardWithVideo({ href: '0_ibuqxqbe' })}
      `;
    default:
      return html`
        ${Card()}${Card({ copy: copyOdd })}${CardWithLongHeading()}${Card({
          copy: copyOdd,
        })}${Card()}
      `;
  }
};

export default {
  title: 'Components/Carousel',
  decorators: [
    (story) => {
      return html`
        <style>
          ${styles}
        </style>
        <div class="cds--grid">
          <div class="cds--row">
            <c4d-carousel>${story()}</c4d-carousel>
          </div>
        </div>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Carousel: () => {
        const mediaType = select(
          'Media type:',
          ['none', 'images', 'videos', 'mixed'],
          'none'
        );
        return {
          mediaType,
        };
      },
    },
    propsSet: {
      default: {
        Carousel: {
          cardSize: 4,
          mediaType: 'none',
        },
      },
    },
  },
};
