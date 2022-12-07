/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, boolean, number } from '@storybook/addon-knobs';
import { TouchScreen, Pattern, Touch } from '@carbon/pictograms-react';
import classNames from 'classnames';
import ContentGroupPictograms from '../ContentGroupPictograms';
import React from 'react';
import readme from '../README.stories.mdx';

const pictograms = {
  TouchScreen: 'TouchScreen',
  Touch: 'Touch',
  Pattern: 'Pattern',
};

/**
 * Returns the react component based on the value in the pictogram variables
 *
 * @param {string} sel string that defines the returning pictogram
 * @returns {*} JSX pictogram component
 */
const selectPictogram = (sel) => {
  switch (sel) {
    case 'TouchScreen':
      return TouchScreen;
    case 'Pattern':
      return Pattern;
    case 'Touch':
      return Touch;
  }
};

/**
 * Toggles CTA data based on item value
 *
 * @param {boolean} item defines if cta will be rendered
 * @returns {*} if true returns cta data, if false, returns null
 */
const toggleCTA = (item) => {
  if (item) {
    return {
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet ',
    };
  } else {
    return null;
  }
};

const props = () => {
  const pictogramCount = number('Number of PictogramItems', 3, {});
  const items = [];

  for (let i = 0; i < pictogramCount; i++) {
    items.push({
      heading: text(
        `Item ${i + 1} Heading (items.heading)`,
        'Aliquam condimentum interdum'
      ),
      copy: text(
        `Item ${i + 1} Copy (items.copy)`,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.'
      ),
      cta: toggleCTA(boolean(`Item ${i + 1} CTA (items.cta)`, true)),
      pictogram: {
        src: selectPictogram(
          select(
            `Item ${i + 1} Pictogram (pictogram)`,
            pictograms,
            pictograms.TouchScreen
          )
        ),
        'aria-label': 'Pictogram',
      },
    });
  }
  return {
    heading: text('Pattern title (heading)', 'Lorem ipsum dolor sit amet'),
    copy: text(
      'Copy (copy)',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.'
    ),
    items,
  };
};

export default {
  title: 'Components/Content group pictograms',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Content group pictograms: Default',
    },
    propsSet: {
      default: {
        ContentGroupPictograms: {
          items: [
            {
              heading: 'Aliquam condimentum interdum',
              copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              pictogram: {
                src: selectPictogram(pictograms.Desktop),
                'aria-label': 'Pictogram',
              },
            },
          ],
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <ContentGroupPictograms
          className={classNames(
            `bx--col-sm-4`,
            `bx--col-lg-8`,
            `bx--offset-lg-4`
          )}
          {...props()}
        />
      </div>
    </div>
  );
};
