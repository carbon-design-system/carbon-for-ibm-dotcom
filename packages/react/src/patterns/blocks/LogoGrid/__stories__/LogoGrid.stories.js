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
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|LogoGrid', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Heading (heading)', 'Our customers');
    const ctaHref = text('Card href (cta.href):', 'https://www.example.com');
    const ctaCopy = text('Card copy (copy):', 'Lorem ipsum dolor sit amet');
    const ctaProps = {
      style: 'card',
      type: 'local',
      copy: ctaCopy,
      cta: {
        href: ctaHref,
      },
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
              cta={ctaProps}
              hideBorder={hideBorder}
            />
          </div>
        </div>
      </div>
    );
  });
