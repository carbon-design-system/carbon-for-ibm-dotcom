import './index.scss';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_LOGO_GRID } from '../../../internal/FeatureFlags';
import LogoGrid from '../LogoGrid';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

const logosGroup = [
  {
    label: 'Company A',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company B',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company C',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company D',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company E',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company F',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company G',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company H',
    imgSrc: 'https://via.placeholder.com/140',
    altText: 'placeholder',
  },
  {
    label: 'Company I',
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
