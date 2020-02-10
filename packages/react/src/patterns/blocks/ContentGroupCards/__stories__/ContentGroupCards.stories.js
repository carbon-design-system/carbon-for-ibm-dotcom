import './index.scss';
import { text, withKnobs } from '@storybook/addon-knobs';
import ContentGroupCards from '../ContentGroupCards';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|ContentGroupCards', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text(
      'Pattern title(required):',
      'Lorem ipsum dolor sit amet.'
    );

    const items = [
      {
        heading: text(
          'Card1 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt'
        ),
        copy: text(
          'Card1 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ),
        cta: {
          href: text('Card1 link href:', 'https://www.example.com'),
        },
      },
      {
        heading: text(
          'Card2 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text(
          'Card2 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        cta: {
          href: text('Card1 link href:', 'https://www.example.com'),
        },
      },
      {
        heading: text(
          'Card3 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text('Card3 Body:', 'Lorem ipsum dolor sit amet'),
        cta: {
          href: text('Card1 link href:', 'https://www.example.com'),
        },
      },
      {
        heading: text(
          'Card4 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text(
          'Card4 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        ),
        cta: {
          href: text('Card1 link href:', 'https://www.example.com'),
        },
      },
    ];

    return <ContentGroupCards heading={heading} items={items} />;
  });
