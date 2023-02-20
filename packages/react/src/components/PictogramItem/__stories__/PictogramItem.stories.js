/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, select } from '@storybook/addon-knobs';
import PictogramItem from '../PictogramItem';
import React from 'react';
import readme from '../README.stories.mdx';

/**
 * Returns the react component based on the value in the pictogram variables
 *
 * @param {string} sel string that defines the returning pictogram
 * @returns {*} JSX pictogram component
 */
const selectPictogram = (sel) => {
  switch (sel) {
    case 'Desktop':
      return Desktop;
    case 'Pattern':
      return Pattern;
    case 'Touch':
      return Touch;
  }
};

const pictograms = {
  Desktop: 'Desktop',
  Touch: 'Touch',
  Pattern: 'Pattern',
};

const props = () => ({
  heading: text('Heading (required)', 'Lorem ipsum dolor sit'),
  copy: text(
    'Copy (required)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  ),
  pictogram: {
    src: selectPictogram(
      select('Pictogram (required)', pictograms, pictograms.Desktop)
    ),
    'aria-label': text('Aria-label:', 'Pictogram description'),
  },

  cta: {
    type: 'local',
    href: 'https://www.example.com',
    copy: 'Lorem ipsum dolor',
  },
});

export default {
  title: 'Components/Pictogram item',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Pictogram item: Default',
    },
    propsSet: {
      default: {
        PictogramItem: {
          pictogram: {
            src: selectPictogram(pictograms.Desktop),
          },
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <PictogramItem {...props()} />
        </div>
      </div>
    </div>
  );
};
