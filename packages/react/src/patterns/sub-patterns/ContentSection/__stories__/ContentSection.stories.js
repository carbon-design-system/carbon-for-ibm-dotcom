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
      'Component heading(required):',
      'Lorem ipsum dolor sit amet'
    );
    const children = text('Grey box represents:', '');
    const themes = {
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
      white: '',
    };

    return (
      <div className={`${prefix}--grid ${prefix}--content-section-story`}>
        <ContentSection
          heading={heading}
          theme={select('theme', themes, themes.white)}
          children={children}
        />
      </div>
    );
  });
