import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import readme from '../README.md';
import './index.scss';

import HorizontalRule from '../HorizontalRule';

storiesOf('HorizontalRule', module)
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
