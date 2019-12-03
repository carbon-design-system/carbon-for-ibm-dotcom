import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CARD_ARRAY } from '../../../internal/FeatureFlags';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/cardarray/index.scss';
import CardArray from '../CardArray';
import readme from '../README.md';

if (DDS_CARD_ARRAY) {
  storiesOf('Content Array with Cards', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title(required):',
        'Lorem ipsum dolor sit amet.'
      );

      const content = [
        {
          title: text(
            'Card1 Title:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          ),
          copy: text(
            'Card1 Body:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          ),
          link: {
            target: text('Card1 link target:', '_blank'),
            href: text('Card1 link href:', 'https://www.example.com'),
          },
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
          link: {
            target: text('Card2 link target:', '_blank'),
            href: text('Card2 link href:', 'https://www.example.com'),
          },
        },
        {
          title: text(
            'Card3 Title:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          ),
          copy: text('Card3 Body:', 'Lorem ipsum dolor sit amet'),
          link: {
            target: text('Card3 link target:', '_blank'),
            href: text('Card3 link href:', 'https://www.example.com'),
          },
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
          link: {
            target: text('Card4 link target:', '_blank'),
            href: text('Card1 link href:', 'https://www.example.com'),
          },
        },
      ];

      return <CardArray title={title} content={content} />;
    });
}
