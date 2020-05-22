/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import LogoGrid from '../LogoGrid';
import logos from './data/logos.json';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Patterns (Blocks)|LogoGrid',
  decorators: [withKnobs],
  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const heading = text('Heading (heading)', 'Our customers');
  const ctaProps = {
    style: 'card',
    type: 'local',
    copy: 'See all customers.',
    cta: {
      href: 'https://www.example.com',
    },
  };

  const cta = {
    cta: ctaProps,
    none: null,
  };

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
            cta={select('CTA (optional)', cta, cta.cta)}
            hideBorder={hideBorder}
          />
        </div>
      </div>
    </div>
  );
};
