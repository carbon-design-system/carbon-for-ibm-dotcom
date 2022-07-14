/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import logoAdobe from '../../../../../storybook-images/assets/logos/logo-adobe.png';
import logoCisco from '../../../../../storybook-images/assets/logos/logo-cisco.png';
import logoDell from '../../../../../storybook-images/assets/logos/logo-dell.png';
import LogoGrid from '../LogoGrid';
import logoMicrosoft from '../../../../../storybook-images/assets/logos/logo-microsoft.png';
import logoRabobank from '../../../../../storybook-images/assets/logos/logo-rabobank.png';
import logoUsBank from '../../../../../storybook-images/assets/logos/logo-usbank.png';
import React from 'react';
import readme from '../README.stories.mdx';

const logos = [
  {
    label: 'Microsoft',
    imgSrc: logoMicrosoft,
    altText: 'Microsoft',
  },
  {
    label: 'Dell',
    imgSrc: logoDell,
    altText: 'Dell',
  },
  {
    label: 'Rabobank',
    imgSrc: logoRabobank,
    altText: 'Rabobank',
  },
  {
    label: 'Adobe',
    imgSrc: logoAdobe,
    altText: 'Adobe',
  },
  {
    label: 'US Bank',
    imgSrc: logoUsBank,
    altText: 'US Bank',
  },
  {
    label: 'Cisco',
    imgSrc: logoCisco,
    altText: 'Cisco',
  },
];

const props = () => {
  const showCta = boolean('Display CTA:', false);
  const ctaHref = showCta
    ? text('CTA Href (ctaHref):', 'http://local.url.com/')
    : '';
  const ctaCopy = showCta
    ? text('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet')
    : '';

  return {
    heading: text('Heading (heading)', 'Our customers'),
    logosGroup: logos,
    hideBorder: boolean(
      'Hide border (hideBorder): Hide the bottom border',
      false
    ),
    showCta,
    ctaHref,
    ctaCopy,
  };
};

export default {
  title: 'Components/Logo grid',
  parameters: {
    ['carbon-theme']: { disabled: true },
    ...readme.parameters,
    propsSet: {
      default: {
        LogoGrid: {
          logosGroup: logos,
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
          <LogoGrid {...props()} />
        </div>
      </div>
    </div>
  );
};
