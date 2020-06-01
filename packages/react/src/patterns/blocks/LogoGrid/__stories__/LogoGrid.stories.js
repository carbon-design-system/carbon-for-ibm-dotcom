/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, text } from '@storybook/addon-knobs';
import LogoGrid from '../LogoGrid';
import logos from './data/logos.json';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|LogoGrid',
  parameters: {
    ...readme.parameters,
    knobs: {
      LogoGrid: ({ groupId }) => ({
        heading: text('Heading (heading)', 'Our customers', groupId),
        logosGroup: object('Data', logos, groupId),
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
