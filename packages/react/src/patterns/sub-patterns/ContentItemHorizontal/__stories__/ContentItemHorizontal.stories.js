/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index.scss';
import { object, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import ContentItemHorizontal from '../ContentItemHorizontal';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentItemHorizontal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const eyebrow = 'Lorem ipsum';
    const heading = 'Aliquam condimentum';
    const copy =
      'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.';
    const cta = object('cta', [
      {
        type: 'local',
        copy: 'Link text',
        icon: {
          src: ArrowRight20,
        },
        href: 'https://example.com',
      },
      {
        type: 'external',
        copy: 'Link text',
        icon: {
          src: ArrowRight20,
        },
        href: 'https://example.com',
      },
    ]);

    return (
      <div className="bx--grid bx--content-group-story">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
            <ContentItemHorizontal
              eyebrow={eyebrow}
              heading={heading}
              copy={copy}
              cta={cta}
            />
          </div>
        </div>
      </div>
    );
  });
