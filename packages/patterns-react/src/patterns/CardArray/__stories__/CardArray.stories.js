import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CARDARRAY } from '../../../internal/FeatureFlags';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/cardarray/index.scss';
import CardArray from '../CardArray';
// import readme from '../README.md';

if (DDS_CARDARRAY) {
  storiesOf('Card Array', module)
    .addDecorator(withKnobs)
    // .addParameters({
    //   readme: {
    //     sidebar: readme,
    //   },
    // })
    .add('Default', () => {
      const title = text(
        'Pattern title(required):',
        'Lorem ipsum dolor sit amet.'
      );

      const icons = {
        ArrowRight: 'ArrowRight',
        ArrowDown: 'ArrowDown',
        Pdf: 'Pdf',
      };

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
            icon: select('Card1 link icon:', icons, icons.ArrowRight),
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          ),
          link: {
            icon: select('Card2 link icon:', icons, icons.ArrowRight),
            target: text('Card2 link target:', '_blank'),
            href: text('Card2 link href:', 'https://www.example.com'),
          },
        },
        {
          title: text(
            'Card3 Title:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          ),
          copy: text(
            'Card3 Body:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          ),
          link: {
            icon: select('Card3 link icon:', icons, icons.ArrowRight),
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          ),
          link: {
            icon: select('Card4 link icon:', icons, icons.ArrowRight),
            target: text('Card4 link target:', '_blank'),
            href: text('Card1 link href:', 'https://www.example.com'),
          },
        },
      ];

      return <CardArray title={title} content={content} />;
    });
}
