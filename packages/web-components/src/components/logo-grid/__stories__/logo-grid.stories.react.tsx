/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import DDSLogoGridLink from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-link';
import DDSLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';

import logos from './data/logos.js';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, logoCount, logoRatio, logosGroup, hideBorder, showCta, ctaCopy, ctaHref } = parameters?.props?.LogoGrid ?? {};

  const logoGrid = document.querySelector('dds-logo-grid');

  if (logoGrid && hideBorder) {
    logoGrid.setAttribute('hide-border', hideBorder);
  } else {
    logoGrid?.removeAttribute('hide-border');
  }

  return (
    <DDSLogoGrid logo-count={logoCount} logo-ratio={logoRatio}>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      {logosGroup && logosGroup.map(elem => <DDSLogoGridItem default-src={elem.imgSrc} alt={elem.altText}></DDSLogoGridItem>)}
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
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LogoGrid: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Our customers', groupId),
        logoCount: select('Column count (logoCount)', { 'Default (3)': '3', '4': '4' }, '3', groupId),
        logoRatio: select(
          'Logo aspect ratio (logoRatio)',
          { 'Default (4:3)': '4:3', '16:9': '16:9', '2:1': '2:1' },
          '4:3',
          groupId
        ),
        logosGroup: logos,
        hideBorder: boolean('Hide border (hideBorder): Hide the bottom border', false, groupId),
        showCta: boolean('Display CTA:', false, groupId),
        ctaCopy: text('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet', groupId),
        ctaHref: text('CTA Href (ctaHref):', 'http://local.url.com/', groupId),
      }),
    },
  },
};
