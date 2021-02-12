/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { classMap } from 'lit-html/directives/class-map';
import { html } from 'lit-element';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import '../../card/card';
import '../../card/card-footer';
import '../../card/card-heading';
import '../../content-section/content-section';
import '../../content-section/content-section-copy';
import '../../content-section/content-section-heading';
import '../../link-with-icon/link-with-icon';
import '../carousel';
import styles from './carousel.stories.scss';
import readme from './README.stories.mdx';

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const cardSizes16 = {
  '1 for sm, 2 for md, 4 for lg and beyond': '',
  '1 for sm and md, 2 for lg and beyond': 'dds-ce-demo-devenv--carousel--full-16--large',
};

const cardSizes8 = {
  '1 for sm and md, 2 for lg and beyond': '',
  '1 for all breakpoints': 'dds-ce-demo-devenv--carousel--center-8--large',
};

const Card = ({ copy = copyDefault, heading = headingDefault, href = hrefDefault } = {}) => html`
  <dds-card href="${ifNonNull(href)}">
    <dds-card-heading>${heading}</dds-card-heading>
    ${copy}
    <dds-card-footer>
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card>
`;

export const Default = ({ parameters }) => {
  const { cardSize } = parameters?.props?.Carousel ?? {};
  const classes = classMap({
    [cardSize]: cardSize,
  });
  return html`
    <dds-carousel class="${classes}">
      ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({ copy: copyOdd })}${Card()}
    </dds-carousel>
  `;
};

Default.story = {
  parameters: {
    gridCarouselClass: 'dds-ce-demo-devenv--simple-grid--carousel--full-16',
    knobs: {
      Carousel: ({ groupId }) => ({
        cardSize: select(
          'Number of cards per page (--dds--carousel-page-size CSS custom property)',
          cardSizes16,
          cardSizes16['1 for sm, 2 for md, 4 for lg and beyond'],
          groupId
        ),
      }),
    },
  },
};

export const Right12Columns = context => Default(context);

Right12Columns.story = {
  parameters: {
    gridCarouselClass: 'dds-ce-demo-devenv--simple-grid--carousel--right-12',
  },
};

export const Center8Columns = context => Default(context);

Center8Columns.story = {
  parameters: {
    gridCarouselClass: 'dds-ce-demo-devenv--simple-grid--carousel--center-8',
    knobs: {
      Carousel: ({ groupId }) => ({
        cardSize: select(
          'Number of cards per page (--dds--carousel-page-size CSS custom property)',
          cardSizes8,
          cardSizes8['1 for sm and md, 2 for lg and beyond'],
          groupId
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Carousel',
  decorators: [
    (story, { parameters }) => {
      const { gridCarouselClass } = parameters;
      const classes = classMap({
        'dds-ce-demo-devenv--simple-grid': true,
        'dds-ce-demo-devenv--simple-grid--carousel': true,
        [gridCarouselClass]: gridCarouselClass,
      });
      return html`
        <style>
          ${styles}
        </style>
        <div class="${classes}">
          ${story()}
        </div>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};
