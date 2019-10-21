import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/components/buttongroup/_buttongroup.scss';
import readme from '../README.md';
import { BUTTON_GROUP } from '../../../internal/FeatureFlags';

import ButtonGroup from '../ButtonGroup';

if (BUTTON_GROUP) {
  storiesOf('ButtonGroup', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const buttons = [
        {
          link: '',
          copy: 'Primary action button',
          renderIcon: 'ArrowDown',
        },
        {
          link: '',
          copy: 'Secondary action button',
          renderIcon: 'ArrowRight',
        },
      ];

      return (
        <div
          style={{
            padding: 2 + `rem`,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'black',
          }}>
          <ButtonGroup buttons={object('buttons', buttons)} />
        </div>
      );
    });
}
