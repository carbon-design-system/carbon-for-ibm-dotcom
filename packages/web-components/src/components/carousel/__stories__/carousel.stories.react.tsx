/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import classnames from 'classnames';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
// @ts-ignore
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
// @ts-ignore
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// @ts-ignore
import DDSCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import styles from './carousel.stories.scss';
import readme from './README.stories.react.mdx';

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

const Card = ({ copy = copyDefault, heading = headingDefault, href = hrefDefault } = {}) => (
  <DDSCard href={href}>
    <DDSCardHeading>{heading}</DDSCardHeading>
    {copy}
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCard>
);

export const Default = ({ parameters }) => {
  const { cardSize } = parameters?.props?.Carousel ?? {};
  const classes = classnames({
    [cardSize]: cardSize,
  });
  // `className` is not supported by our React wrapper
  return (
    <DDSCarousel class={classes}>
      <Card />
      <Card copy={copyOdd} />
      <Card />
      <Card copy={copyOdd} />
      <Card />
    </DDSCarousel>
  );
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
      const classes = classnames('dds-ce-demo-devenv--simple-grid', 'dds-ce-demo-devenv--simple-grid--carousel', {
        [gridCarouselClass]: gridCarouselClass,
      });
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className={classes}>{story()}</div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};
