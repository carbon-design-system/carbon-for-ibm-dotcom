import './index.scss';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Link with Icon', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return (
      <div
        style={{
          padding: 2 + `rem`,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <LinkWithIcon
          href="https://www.ibm.com"
          disabled={boolean('Disabled', false)}>
          <span>Link text</span>
          <ArrowRight20 />
        </LinkWithIcon>
      </div>
    );
  });
