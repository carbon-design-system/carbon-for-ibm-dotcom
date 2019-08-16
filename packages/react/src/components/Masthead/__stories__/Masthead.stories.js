import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Masthead from '../Masthead';
import MastheadL1 from '../MastheadL1';
import knobData from './data/knobs.json';
import mastheadLinks from './data/MastheadNav.js';

storiesOf('Masthead', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Masthead
      type={select('Type', knobData.type, 'branded')}
      navigation={mastheadLinks}
    />
  ))
  .add('Default with L1', () => (
    <>
      <Masthead
        type={select('Type', knobData.type, 'branded')}
        navigation={mastheadLinks}
      />
      <MastheadL1 />
    </>
  ));
