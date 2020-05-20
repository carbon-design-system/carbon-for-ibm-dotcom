/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowDown20, ArrowRight20, Pdf20 } from '@carbon/icons-react';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import ButtonGroup from '../ButtonGroup';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Patterns (Sub-Patterns)|ButtonGroup',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const iconMap = {
    ArrowRight20,
    ArrowDown20,
    Pdf20,
  };

  const iconOptions = {
    None: null,
    'Arrow Right': 'ArrowRight20',
    'Arrow Down': 'ArrowDown20',
    PDF: 'Pdf20',
  };

  const buttonCount = number('Number of buttons', 2);
  const buttons = [];

  for (let i = 0; i < buttonCount; i++) {
    buttons.push({
      href: text(`Link ${i + 1}`, `https://example.com`),
      copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
      renderIcon:
        iconMap[
          select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right'])
        ],
    });
  }

  return (
    <div
      className="bx-grid"
      style={{
        padding: 2 + `rem`,
        backgroundColor: 'black',
      }}>
      <div style={{ color: 'white' }}>
        This button group is wrapped within the grid to let the buttons shrink
        when the text gets smaller
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-16 bx--col-md-6 bx--col-sm-16">
          <ButtonGroup buttons={buttons} />
        </div>
      </div>
      <div style={{ color: 'white', paddingTop: '20px' }}>
        This button group is not using the grid, so the buttons won't shrink
        according to the text size
      </div>
      <ButtonGroup buttons={buttons} />
    </div>
  );
};
