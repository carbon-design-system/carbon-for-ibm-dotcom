import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
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

    return (
      <div
        className="bx--grid bx--grid--full-width"
        style={{ marginTop: '50px' }}>
        <HorizontalRule
          type={select('type', types, 'solid')}
          length={select('length', lengths, 'small')}
          color={select('color', colors, 'medium-contrast')}
          width={select('width', widths, 'thin')}
        />
      </div>
    );
  });
