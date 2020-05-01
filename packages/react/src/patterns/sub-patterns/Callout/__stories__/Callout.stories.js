import './index.scss';
import { ArrowDown20, ArrowRight20, Pdf20 } from '@carbon/icons-react';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import Callout from '../Callout';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|Callout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('With Button Group example', () => {
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
    const children = <ButtonGroup buttons={buttons} />;

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--col-lg-12 bx--offset-lg-4">
            <Callout children={children} />
          </div>
        </div>
      </div>
    );
  })

  .add('Simple example', () => {
    const children = <p style={{ color: 'white' }}>hello world</p>;
    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--col-lg-12 bx--offset-lg-4">
            <Callout children={children} />
          </div>
        </div>
      </div>
    );
  });
