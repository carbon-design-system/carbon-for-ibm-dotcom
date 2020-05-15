/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import {
  select,
  text,
  withKnobs,
  boolean,
  number,
} from '@storybook/addon-knobs';
import classNames from 'classnames';
import ContentGroupPictograms from '../ContentGroupPictograms';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Patterns (Blocks)|ContentGroupPictograms',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const pictograms = {
    Desktop: 'Desktop',
    Touch: 'Touch',
    Pattern: 'Pattern',
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

  const heading = text(
    'Pattern title (required)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  );

  /**
   * Toggles CTA data based on item value
   *
   * @param {boolean} item defines if cta will be rendered
   * @returns {*} if true returns cta data, if false, returns null
   */
  const toggleCTA = item => {
    if (item) {
      return {
        type: 'local',
        href: 'https://www.example.com',
        copy: 'Lorem ipsum dolor',
      };
    } else {
      return null;
    }
  };

  const pictogramCount = number('Number of PictogramItems', 3);
  const items = [];

  for (let i = 0; i < pictogramCount; i++) {
    items.push({
      heading: text(
        `Item ${i + 1} Heading (required)`,
        'Aliquam condimentum interdum'
      ),
      copy: text(
        `Item ${i + 1} Copy (required)`,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
      ),
      cta: toggleCTA(boolean(`Item ${i + 1} CTA`, false)),
      pictogram: {
        src: selectPictogram(
          select(
            `Item ${i + 1} Pictogram (required)`,
            pictograms,
            pictograms.Desktop
          )
        ),
        'aria-label': 'Pictogram',
      },
    });
  }

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <ContentGroupPictograms
          className={classNames(
            `bx--col-sm-4`,
            `bx--col-lg-8`,
            `bx--offset-lg-4`
          )}
          heading={heading}
          items={items}
        />
      </div>
    </div>
  );
};
