/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { ArrowRight } from '@carbon/icons-react';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import C4DLogoGridLink from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-link';
import C4DLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';

import logos from './data/logos.js';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const iconProps = {
  size: 20,
  slot: 'icon',
};

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
  } = args?.LogoGrid ?? {};

  const logoGrid = document.querySelector('cds-logo-grid');

  if (logoGrid && hideBorder) {
    logoGrid.setAttribute('hide-border', hideBorder);
  } else {
    logoGrid?.removeAttribute('hide-border');
  }

  return (
    <C4DLogoGrid logo-count={logoCount} logo-ratio={logoRatio}>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      {logosGroup &&
        logosGroup.map((elem) => (
          <C4DLogoGridItem
            default-src={elem.imgSrc}
            alt={elem.altText}></C4DLogoGridItem>
        ))}
      {showCta ? (
        <C4DLogoGridLink href={ctaHref}>
          <C4DCardLinkHeading>{ctaCopy}</C4DCardLinkHeading>
          <C4DCardFooter>
            <ArrowRight {...iconProps} />
          </C4DCardFooter>
        </C4DLogoGridLink>
      ) : (
        ''
      )}
    </C4DLogoGrid>
  );
};

export default {
  title: 'Components/Logo grid',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-12">
            {story()}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LogoGrid: () => ({
        heading: textNullable('Heading (heading)', 'Our customers'),
        logoCount: select(
          'Column count (logoCount)',
          { 'Default (3)': '3', '4': '4' },
          '3'
        ),
        logoRatio: select(
          'Logo aspect ratio (logoRatio)',
          { 'Default (4:3)': '4:3', '16:9': '16:9', '2:1': '2:1' },
          '4:3'
        ),
        logosGroup: logos,
        hideBorder: boolean(
          'Hide border (hideBorder): Hide the bottom border',
          false
        ),
        showCta: boolean('Display CTA:', false),
        ctaCopy: text('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet'),
        ctaHref: text('CTA Href (ctaHref):', 'http://local.url.com/'),
      }),
    },
  },
};
