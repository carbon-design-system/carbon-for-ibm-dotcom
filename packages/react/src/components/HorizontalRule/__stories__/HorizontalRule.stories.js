import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import HorizontalRule from '../HorizontalRule';

storiesOf('HorizontalRule', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const styles = {
      solid: 'solid',
      dashed: 'dashed',
    };

    const sizes = {
      small: 'small',
      medium: 'medium',
      large: 'large',
      fluid: 'fluid',
    };

    const contrasts = {
      low: 'low-contrast',
      medium: 'medium-contrast',
      high: 'high-contrast',
    };

    const weights = {
      thin: 'thin',
      thick: 'thick',
    };

    const words = text(
      'text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );

    return (
      <div>
        <div className="bx-grid">
          <h1>
            <b>Grid with no Gutter</b>
          </h1>
          <div className="bx--row bx--no-gutter">
            <div className="bx--col">
              <HorizontalRule
                style={select('style', styles, 'solid')}
                size={select('size', sizes, 'fluid')}
                contrast={select('contrast', contrasts, 'medium-contrast')}
                weight={select('weight', weights, 'thin')}
              />
            </div>
          </div>
        </div>

        <div className="bx--grid bx--grid--full-width">
          <h1>
            <b>Grid with Gutter</b>
          </h1>
          <div className="bx--row">
            <div className="bx--col">
              <h3>{words}</h3>
              <HorizontalRule
                style={select('style', styles, 'solid')}
                size={select('size', sizes, 'fluid')}
                contrast={select('contrast', contrasts, 'medium-contrast')}
                weight={select('weight', weights, 'thin')}
              />
              <h3>{words}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  });
