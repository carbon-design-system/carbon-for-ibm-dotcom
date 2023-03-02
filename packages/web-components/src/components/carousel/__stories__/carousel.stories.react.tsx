/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
// @ts-ignore
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';

import readme from './README.stories.react.mdx';

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
} = {}) => (
  <DDSCard href={href}>
    <DDSCardHeading>{heading}</DDSCardHeading>
    <p>{copy}</p>
    {image ? (
      <DDSImage slot="image" alt="example image" defaultSrc={image} />
    ) : (
      ''
    )}
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCard>
);

export const Default = () => {
  return (
    <DDSCarousel>
      <Card />
      <Card copy={copyOdd} />
      <Card />
      <Card copy={copyOdd} />
      <Card />
    </DDSCarousel>
  );
};

export const CardsWithImages = () => {
  return (
    <DDSCarousel>
      <Card image={imgLg2x1} />
      <Card copy={copyOdd} image={imgLg2x1} />
      <Card image={imgLg2x1} />
      <Card copy={copyOdd} image={imgLg2x1} />
      <Card image={imgLg2x1} />
    </DDSCarousel>
  );
};

export default {
  title: 'Components/Carousel',
  decorators: [
    (story) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">{story()}</div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
