import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
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
    const heading = text(
      'Component title(required):',
      'Lorem ipsum dolor sit amet'
    );
    const themes = {
      g10: 'g10',
      white: '',
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentSection
          heading={heading}
          theme={select('theme', themes, themes.white)}
        />
      </div>
    );
  });
