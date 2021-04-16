/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import imgMd4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--004.jpg';
import LogoGrid from '../LogoGrid';
import React from 'react';
import readme from '../README.stories.mdx';

const logos = [
  {
    label: 'Company A',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company B',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company C',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company D',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company E',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company F',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company G',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company H',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
  {
    label: 'Company I',
    imgSrc: imgMd4x3,
    altText: 'Image alt text',
  },
];

export default {
  title: 'Components|Logo grid',
  parameters: {
    ['carbon-theme']: { disabled: true },
    ...readme.parameters,
    knobs: {
      LogoGrid: ({ groupId }) => ({
        heading: text('Heading (heading)', 'Our customers', groupId),
        logosGroup: logos,
        ctaCopy: text(
          'CTA Copy (ctaCopy)',
          'Lorem ipsum dolor sit amet',
          groupId
        ),
        ctaHref: text('CTA Href (ctaHref)', 'http://local.url.com/', groupId),
        hideBorder: boolean(
          'Hide border (hideBorder): Hide the bottom border',
          false,
          groupId
        ),
      }),
    },
    propsSet: {
      default: {
        LogoGrid: {
          logosGroup: logos,
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, logosGroup, ctaCopy, ctaHref, hideBorder } =
    parameters?.props?.LogoGrid ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
          <LogoGrid
            heading={heading}
            logosGroup={logosGroup}
            ctaCopy={ctaCopy}
            ctaHref={ctaHref}
            hideBorder={hideBorder}
          />
        </div>
      </div>
    </div>
  );
};
