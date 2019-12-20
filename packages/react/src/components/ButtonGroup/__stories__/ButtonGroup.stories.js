import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';
import readme from '../README.md';
import { DDS_BUTTON_GROUP } from '../../../internal/FeatureFlags';

import './index.scss';

import ButtonGroup from '../ButtonGroup';

if (DDS_BUTTON_GROUP) {
  storiesOf('ButtonGroup', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
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
          link: text(`Link ${i + 1}`, `https://example.com`),
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
            This button group is wrapped within the grid to let the buttons
            shrink when the text gets smaller
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
    });
}
