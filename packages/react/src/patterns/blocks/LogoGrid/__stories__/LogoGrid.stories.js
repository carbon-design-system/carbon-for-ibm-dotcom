/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import LogoGrid from '../LogoGrid';
import logos from './data/logos.json';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|LogoGrid',
  decorators: [withKnobs],
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const heading = text('Heading (heading)', 'Our customers');
  const ctaCopy = text('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet');
  const ctaHref = text('CTA Href (ctaHref)', 'http://local.url.com/');

  let hideBorder = boolean(
    'Hide border (hideBorder): Hide the bottom border',
    false
  );

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
          <LogoGrid
            heading={heading}
            logosGroup={object('Data', logos)}
            ctaCopy={ctaCopy}
            ctaHref={ctaHref}
            hideBorder={hideBorder}
          />
        </div>
      </div>
    </div>
  );
};
