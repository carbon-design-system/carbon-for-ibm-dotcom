/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import DDSFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import Launch20 from '@carbon/icons-react/es/launch/20';
import DDSLeavingIBMContainer from '@carbon/ibmdotcom-web-components/es/components-react/leaving-ibm/leaving-ibm-container';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import readme from './README.stories.react.mdx';
import styles from './leaving-ibm.stories.scss';

export const Default = args => {
  const { href, ctaText, ctaType } = args?.LeavingIBM ?? {};
  return (
    <>
      <DDSLeavingIBMContainer />
      {ctaType === 'Link' ? (
        <DDSLinkWithIcon iconPlacement="right" href={href} data-leaving-ibm>
          {ctaText}
          <Launch20 slot="icon" />
        </DDSLinkWithIcon>
      ) : null}
      {ctaType === 'Button' ? (
        <DDSButtonGroup>
          <DDSButtonGroupItem href={href} data-leaving-ibm>
            {ctaText}
            <Launch20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSButtonGroup>
      ) : null}
      {ctaType === 'Card' ? (
        <DDSCardLink href={href} data-leaving-ibm>
          <DDSCardLinkHeading>{ctaText}</DDSCardLinkHeading>
          <p>Lorem ipsum dolor sit</p>
          <DDSCardFooter>
            <Launch20 slot="icon" />
          </DDSCardFooter>
        </DDSCardLink>
      ) : null}
      {ctaType === 'Feature Card' ? (
        <DDSFeatureCard href={href} data-leaving-ibm>
          <DDSImage slot="image" alt="Image alt text" default-src={mediumImgLg1x1} />
          <DDSCardHeading>{ctaText}</DDSCardHeading>
          <DDSFeatureCardFooter>
            <Launch20 slot="icon" />
          </DDSFeatureCardFooter>
        </DDSFeatureCard>
      ) : null}
    </>
  );
};

const ctaTypes = ['Link', 'Button', 'Card', 'Feature Card'];

Default.story = {
  parameters: {
    knobs: {
      LeavingIBM: () => ({
        ctaText: text('CTA text', 'Learn more about Carbon'),
        href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/'),
        ctaType: select('CTA type:', ctaTypes, ctaTypes[0]),
      }),
    },
  },
};

export default {
  title: 'Components/Leaving IBM',
  decorators: [
    story => (
      <>
        <style type="text/css">{styles.cssText}</style>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-lg-8 bx--no-gutter">{story()}</div>
          </div>
        </div>
      </>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
