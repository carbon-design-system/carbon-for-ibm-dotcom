/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { number } from '@storybook/addon-knobs';
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
import DDSContentSection from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section';
// @ts-ignore
import DDSContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
// @ts-ignore
// eslint-disable-next-line max-len
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
// @ts-ignore
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
// @ts-ignore
import DDSCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import readme from './README.stories.react.mdx';

const hrefDefault = 'https://www.ibm.com/standards/web/carbon-for-ibm-dotcom';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

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
  const { pageSize } = parameters?.props?.Carousel ?? {};
  return (
    <DDSContentSection>
      <DDSContentSectionHeading>Lorem ipsum dolor sit amet</DDSContentSectionHeading>
      <DDSContentSectionCopy>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      </DDSContentSectionCopy>
      <DDSLinkWithIcon slot="footer" href={hrefDefault}>
        Link text
        <ArrowRight20 slot="icon" />
      </DDSLinkWithIcon>
      <DDSCarousel pageSize={pageSize}>
        <Card />
        <Card copy={copyOdd} />
        <Card />
        <Card copy={copyOdd} />
        <Card />
      </DDSCarousel>
    </DDSContentSection>
  );
};

export default {
  title: 'Components/Card Section Carousel',
  decorators: [
    story => <div className="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-section">{story()}</div>,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      Carousel: ({ groupId }) => ({
        pageSize: number('Page size (pageSize)', null!, groupId),
      }),
    },
  },
};
