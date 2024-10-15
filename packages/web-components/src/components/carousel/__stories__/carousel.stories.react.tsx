/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
// @ts-ignore
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
// @ts-ignore
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// @ts-ignore
import C4DCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
// @ts-ignore
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
// @ts-ignore
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import imgLg2x1 from '../../../../.storybook/storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgLg4x3 from '../../../../.storybook/storybook-images/assets/720/fpo--4x3--720x540--004.jpg';

import styles from './carousel.stories.scss?lit';
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
  <C4DCard href={href} cta-type="local">
    <C4DCardHeading>{heading}</C4DCardHeading>
    <p>{copy}</p>
    {image ? (
      <C4DImage slot="image" alt="example image" default-src={image} />
    ) : (
      ''
    )}
    <C4DCardFooter></C4DCardFooter>
  </C4DCard>
);

const CardWithLongHeading = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
  image = false,
} = {}) => (
  <C4DCard href={href} cta-type="local">
    <C4DCardHeading>{heading}</C4DCardHeading>
    <p>{copy}</p>
    {image ? (
      <C4DImage slot="image" alt="example image" defaultSrc={image} />
    ) : (
      ''
    )}
    <C4DCardFooter></C4DCardFooter>
  </C4DCard>
);

const CardWithVideo = ({ copy = copyDefault, href = hrefDefault } = {}) => (
  <C4DVideoCTAContainer>
    <C4DCard href={href} cta-type="video">
      <p>{copy}</p>
      <C4DCardFooter></C4DCardFooter>
    </C4DCard>
  </C4DVideoCTAContainer>
);

export const Default = () => {
  return (
    <>
      {Card()}
      {Card({ copy: copyOdd })}
      {CardWithLongHeading()}
      {Card({ copy: copyOdd })}
      {Card()}
    </>
  );
};

export const CardsWithImages = () => {
  return (
    <>
      {Card({ image: imgLg2x1 })}
      {Card({ image: imgLg2x1, copy: copyOdd })}
      {Card({ image: imgLg2x1 })}
      {Card({ image: imgLg2x1, copy: copyOdd })}
      {Card({ image: imgLg2x1 })}
    </>
  );
};

export const CardsWithVideos = () => {
  return (
    <>
      {CardWithVideo({ href: '0_ibuqxqbe' })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
    </>
  );
};

export const CardsWithMedia = () => {
  return (
    <>
      {Card({ image: imgLg4x3 })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
      {Card({ image: imgLg4x3 })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
      {Card({ image: imgLg4x3 })}
      {CardWithVideo({ href: '0_ibuqxqbe' })}
    </>
  );
};

export default {
  title: 'Components/Carousel',
  decorators: [
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid">
            <div className="cds--row">
              <C4DCarousel>{story()}</C4DCarousel>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
