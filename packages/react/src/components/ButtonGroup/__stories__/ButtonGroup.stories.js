import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/components/buttongroup/_buttongroup.scss';
import 'carbon-components/scss/globals/grid/_grid.scss';
import readme from '../README.md';

import ButtonGroup from '../ButtonGroup';

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
