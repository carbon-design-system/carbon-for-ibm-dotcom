/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ButtonGroup from '../ButtonGroup';
import cx from 'classnames';
import Pdf20 from '@carbon/icons-react/es/PDF/20';
import React from 'react';
import readme from '../README.stories.mdx';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default {
  title: 'Components|ButtonGroup',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
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

  const inverse = boolean('inverse', false);
  const isInverseClass = inverse ? 'inverse' : 'regular';

  return (
    <div
      className={cx(
        'bx--grid',
        `${prefix}--buttongroup-grid--${isInverseClass}`
      )}
      style={{
        padding: 2 + `rem`,
      }}>
      <div style={{ color: 'white' }}>
        This button group is wrapped within the grid to let the buttons shrink
        when the text gets smaller
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-16 bx--col-md-6 bx--col-sm-16">
          <ButtonGroup buttons={buttons} inverse={inverse} />
        </div>
      </div>
      <div style={{ color: 'white', paddingTop: '20px' }}>
        This button group is not using the grid, so the buttons won't shrink
        according to the text size
      </div>
      <ButtonGroup buttons={buttons} inverse={inverse} />
    </div>
  );
};
