import './index.scss';

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, withKnobs, select } from '@storybook/addon-knobs';
import PictogramItem from '../PictogramItem';
import React from 'react';
// import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|PictogramItem', module)
  .addDecorator(withKnobs)
  //   .addParameters({
  //     readme: {
  //       sidebar: readme,
  //     },
  //   })
  .add('Default', () => {
    const heading = text('Heading (required)', 'Lorem ipsum dolor sit');

    const copy = text(
      'Copy (required)',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    );

    const pictograms = {
      Desktop: 'Desktop',
      Touch: 'Touch',
      Pattern: 'Pattern',
    };

    const pictogram = select(
      'Pictogram (required)',
      pictograms,
      pictograms.Desktop
    );

    const cta = {
      type: 'text',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor',
    };
    /**
     * Returns the react component based on the value in the pictogram variables
     *
     * @param {string} sel string that defines the returning pictogram
     * @returns {*} JSX pictogram component
     */
    const selectPictogram = sel => {
      switch (sel) {
        case 'Desktop':
          return Desktop;
        case 'Pattern':
          return Pattern;
        case 'Touch':
          return Touch;
      }
    };
    return (
      <PictogramItem
        heading={heading}
        copy={copy}
        Pictogram={selectPictogram(pictogram)}
        cta={cta}
      />
    );
  });
