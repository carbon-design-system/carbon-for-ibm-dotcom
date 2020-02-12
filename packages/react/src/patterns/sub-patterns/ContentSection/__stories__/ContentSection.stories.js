import './index.scss';
import { text, withKnobs } from '@storybook/addon-knobs';
import ContentSection from '../ContentSection';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Sub-Patterns)|ContentSection', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const copy = text(
      'Component title(required):',
      'Lorem ipsum dolor sit amet.'
    );

    //return <ContentSection heading={copy} />;
    return (
      <div className={`${prefix}--grid`}>
        <ContentSection heading={copy}></ContentSection>
      </div>
    );
  });
