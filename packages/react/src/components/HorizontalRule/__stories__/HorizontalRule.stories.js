/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, withKnobs } from '@storybook/addon-knobs';
import HorizontalRule from '../HorizontalRule';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|HorizontalRule', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const styles = {
      solid: '',
      dashed: 'dashed',
    };

    const sizes = {
      small: 'small',
      medium: 'medium',
      large: 'large',
      fluid: '',
    };

    const contrasts = {
      'low-contrast': 'low-contrast',
      'medium-contrast': '',
      'high-contrast': 'high-contrast',
    };

    const weights = {
      thin: '',
      thick: 'thick',
    };

    const words = text(
      'text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );

    return (
      <div>
        <h1>
          <b>Grid with no Gutter</b>
        </h1>
        <div className="bx--grid" style={{ marginBottom: '50px' }}>
          <div className="bx--row bx--no-gutter">
            <div className="bx--col">
              <HorizontalRule
                style={select('style', styles, styles.solid)}
                size={select('size', sizes, sizes.fluid)}
                contrast={select(
                  'contrast',
                  contrasts,
                  contrasts['medium-contrast']
                )}
                weight={select('weight', weights, weights.thin)}
              />
            </div>
          </div>
        </div>

        <h1>
          <b>Grid with Gutter</b>
        </h1>
        <div className="bx--grid bx--grid--full-width">
          <div className="bx--row">
            <div className="bx--col">
              <h4>{words}</h4>
              <HorizontalRule
                style={select('style', styles, styles.solid)}
                size={select('size', sizes, sizes.fluid)}
                contrast={select(
                  'contrast',
                  contrasts,
                  contrasts['medium-contrast']
                )}
                weight={select('weight', weights, weights.thin)}
              />
              <h4>{words}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  });
