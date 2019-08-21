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
    };

    return (
      <div className="hr--container">
        <HorizontalRule
          type={select('type', types, 'solid')}
          length={select('length', lengths, 'small')}
        />
      </div>
    );
  });
