import React from 'react';
import { storiesOf } from '@storybook/react';
import Masthead from '../Masthead';
import MastheadL1 from '../MastheadL1';
import mastheadLinks from './data/MastheadLinks.js';
import mastheadLinksWithPlatform from './data/MastheadLinksWithPlatform.js';
import '../../../../../styles/scss/components/masthead/_masthead.scss';
import '../../../../../styles/scss/components/masthead/_masthead-l1.scss';

storiesOf('Masthead', module)
  .add('Default', () => <Masthead navigation={mastheadLinks} />)
  .add('Default with Platform name', () => (
    <>
      <Masthead navigation={mastheadLinksWithPlatform} />
    </>
  ))
  .add('Default with L1', () => (
    <>
      <Masthead navigation={mastheadLinks} />
      <MastheadL1 />
    </>
  ));
