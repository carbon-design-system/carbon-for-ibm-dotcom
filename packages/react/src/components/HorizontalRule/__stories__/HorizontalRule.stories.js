import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import HorizontalRule from '../HorizontalRule';

storiesOf('HorizontalRule', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const types = {
      solid: 'solid',
      dashed: 'dashed',
    };

    const lengths = {
      small: 'small',
      medium: 'medium',
      large: 'large',
      inset: 'inset',
      overhung: 'overhung',
    };

    const colors = {
      'low-contrast': 'low-contrast',
      'medium-contrast': 'medium-contrast',
      'high-contrast': 'high-contrast',
    };

    const widths = {
      thin: 'thin',
      thick: 'thick',
    };

    const words = text(
      'text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );

    return (
      <div
        className="bx--grid bx--grid--full-width"
        style={{ marginTop: '50px' }}>
        <h3>{words}</h3>
        <HorizontalRule
          type={select('type', types, 'solid')}
          length={select('length', lengths, 'small')}
          color={select('color', colors, 'medium-contrast')}
          width={select('width', widths, 'thin')}
        />
        <h3>{words}</h3>
      </div>
    );
  });
