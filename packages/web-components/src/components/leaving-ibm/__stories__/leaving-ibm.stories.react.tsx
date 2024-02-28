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
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import C4DFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import Launch20 from '@carbon/icons-react/es/launch/20';
import C4DLeavingIBMContainer from '@carbon/ibmdotcom-web-components/es/components-react/leaving-ibm/leaving-ibm-container';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import readme from './README.stories.react.mdx';
import styles from './leaving-ibm.stories.scss?lit';

export const Default = (args) => {
  const { href, ctaText, ctaType } = args?.LeavingIBM ?? {};
  return (
    <>
      <C4DLeavingIBMContainer />
      {ctaType === 'Link' ? (
        <C4DLinkWithIcon iconPlacement="right" href={href} data-leaving-ibm>
          {ctaText}
          <Launch20 slot="icon" />
        </C4DLinkWithIcon>
      ) : null}
      {ctaType === 'Button' ? (
        <C4DButtonGroup>
          <C4DButtonGroupItem href={href} data-leaving-ibm>
            {ctaText}
            <Launch20 slot="icon" />
          </C4DButtonGroupItem>
        </C4DButtonGroup>
      ) : null}
      {ctaType === 'Card' ? (
        <C4DCardLink href={href} data-leaving-ibm>
          <C4DCardLinkHeading>{ctaText}</C4DCardLinkHeading>
          <p>Lorem ipsum dolor sit</p>
          <C4DCardFooter>
            <Launch20 slot="icon" />
          </C4DCardFooter>
        </C4DCardLink>
      ) : null}
      {ctaType === 'Feature Card' ? (
        <C4DFeatureCard href={href} data-leaving-ibm>
          <C4DImage
            slot="image"
            alt="Image alt text"
            default-src={mediumImgLg1x1}
          />
          <C4DCardHeading>{ctaText}</C4DCardHeading>
          <C4DFeatureCardFooter>
            <Launch20 slot="icon" />
          </C4DFeatureCardFooter>
        </C4DFeatureCard>
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
        href: text(
          'href (href)',
          'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/'
        ),
        ctaType: select('CTA type:', ctaTypes, ctaTypes[0]),
      }),
    },
  },
};

export default {
  title: 'Components/Leaving IBM',
  decorators: [
    (story) => (
      <>
        <style type="text/css">{styles.cssText}</style>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--col-lg-8 cds--no-gutter">
              {story()}
            </div>
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
