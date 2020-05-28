/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, withKnobs, select } from '@storybook/addon-knobs';
import PictogramItem from '../PictogramItem';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|PictogramItem',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
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
    type: 'local',
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

  const selected = {
    src: selectPictogram(pictogram),
    'aria-label': text('Aria-label:', 'Pictogram description'),
  };

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <PictogramItem
            heading={heading}
            copy={copy}
            pictogram={selected}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};
