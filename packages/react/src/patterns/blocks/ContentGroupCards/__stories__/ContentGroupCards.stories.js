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

    const content = [
      {
        title: text(
          'Card1 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt'
        ),
        copy: text(
          'Card1 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ),
        href: text('Card1 link href:', 'https://www.example.com'),
      },
      {
        title: text(
          'Card2 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text(
          'Card2 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        href: text('Card2 link href:', 'https://www.example.com'),
      },
      {
        title: text(
          'Card3 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text('Card3 Body:', 'Lorem ipsum dolor sit amet'),
        href: text('Card3 link href:', 'https://www.example.com'),
      },
      {
        title: text(
          'Card4 Title:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        copy: text(
          'Card4 Body:',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        ),
        href: text('Card4 link href:', 'https://www.example.com'),
      },
    ];

    return <ContentGroupCards heading={heading} content={content} />;
  });
