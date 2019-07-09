import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Masthead from '../Masthead';
import knobData from './data/knobs.json';

storiesOf('Masthead: Test', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Masthead type={select('Type', knobData.type, 'branded')} />
  ));
