import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_LOGO_GRID } from '../../../internal/FeatureFlags';
import { withKnobs, select, text, object } from '@storybook/addon-knobs';
import './index.scss';
import LogoGrid from '../LogoGrid';
import readme from '../README.md';

const logosGroup = [
  {
    label: 'PHILIPS',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'charles SCHWAB',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'ANA',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'UNI QLO',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Pwe',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'NETFLIX',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'WoolWorths',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Salesforce',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Spotify',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
];

if (DDS_LOGO_GRID) {
  storiesOf('LogoGrid', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
      const themes = {
        g10: 'g10',
        white: '',
      };
      return (
        <LogoGrid
          title={title}
          logosGroup={object('Data', logosGroup)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    });
}
