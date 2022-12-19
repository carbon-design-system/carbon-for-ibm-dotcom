/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import DDSLogoGridLink from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-link';
import DDSLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';

import logos from './data/logos.js';
import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const {
    heading,
    logoCount,
    logoRatio,
    logosGroup,
    hideBorder,
    showCta,
    ctaCopy,
    ctaHref,
  } = args ?? {};

  const logoGrid = document.querySelector('dds-logo-grid');

  if (logoGrid && hideBorder) {
    logoGrid.setAttribute('hide-border', hideBorder);
  } else {
    logoGrid?.removeAttribute('hide-border');
  }

  return (
    <DDSLogoGrid logo-count={logoCount} logo-ratio={logoRatio}>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      {logos &&
        logos.map((elem) => (
          <DDSLogoGridItem
            default-src={elem.imgSrc}
            alt={elem.altText}></DDSLogoGridItem>
        ))}
      {showCta ? (
        <DDSLogoGridLink href={ctaHref}>
          <DDSCardLinkHeading>{ctaCopy}</DDSCardLinkHeading>
          <DDSCardFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardFooter>
        </DDSLogoGridLink>
      ) : (
        ''
      )}
    </DDSLogoGrid>
  );
};

export default {
  title: 'Components/Logo grid',
  component: PropTypesRef,
  decorators: [
    (story) => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12">
            {story()}
          </div>
        </div>
      </div>
    ),
  ],
  argTypes: {
    heading: {
      control: 'text',
      defaultValue: 'Our customers',
    },
    logoCount: {
      control: { type: 'select' },
      options: ['3', '4'],
      defaultValue: '3',
    },
    logoRatio: {
      control: { type: 'select' },
      options: ['4:3', '16:9', '2:1'],
      defaultValue: '4:3',
    },
    hideBorder: {
      control: 'boolean',
      defaultValue: false,
    },
    footer: {
      control: 'boolean',
      defaultValue: false,
    },
    complementaryStyleScheme: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    copy: {
      table: {
        disable: true,
      },
    },
    media: {
      table: {
        disable: true,
      },
    },
    complementary: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
