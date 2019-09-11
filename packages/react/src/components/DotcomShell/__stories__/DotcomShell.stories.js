import React from 'react';
import { storiesOf } from '@storybook/react';
import DotcomShell from '../DotcomShell';
import mastheadLinks from '../../Masthead/__stories__/data/MastheadLinks.js';
import '../../../../../styles/scss/components/dotcom-shell/_dotcom-shell.scss';
import content from './data/content';

storiesOf('Dotcom Shell', module).add('Default', () => {
  return <DotcomShell navigation={mastheadLinks}>{content}</DotcomShell>;
});
