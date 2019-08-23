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
      inset: 'inset',
      overhung: 'overhung',
    };

    const contrasts = {
      low: 'low',
      medium: 'medium',
      high: 'high',
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
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col">
            <h3>{words}</h3>
            <HorizontalRule
              style={select('style', styles, 'solid')}
              size={select('size', sizes, 'small')}
              contrast={select('contrast', contrasts, 'medium')}
              weight={select('weight', weights, 'thin')}
            />
            <h3>{words}</h3>
          </div>
        </div>
      </div>
    );
  });
