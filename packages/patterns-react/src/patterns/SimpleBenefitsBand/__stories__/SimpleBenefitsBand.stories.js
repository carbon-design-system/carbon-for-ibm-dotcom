import './index.scss';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_SIMPLEBENEFITSBAND } from '../../../internal/FeatureFlags';
import React from 'react';
import SimpleBenefitsBand from '../SimpleBenefitsBand';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_SIMPLEBENEFITSBAND) {
  storiesOf('Simple Benefits Band', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title (required)',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit'
      );
      const content = [
        {
          title: 'Aliquam condimentum interdum',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
        {
          title: 'Aliquam',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          link: {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          },
        },
        {
          title: 'Aliquam condimentum interdum',
          copy:
            'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Aenean et ultricies est. Aenean et ultricies est.',
          link: {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          },
        },
        {
          title: 'Aliquam condimentum interdum ultricies est',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.',
          link: {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          },
        },
        {
          title: 'Aliquam condimentum interdum',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
        {
          title: 'Aliquam condimentum interdum',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          link: {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          },
        },
      ];

      const themes = {
        white: '',
        g10: 'g10',
        g90: 'g90',
        g100: 'g100',
      };

      return (
        <SimpleBenefitsBand
          content={object('Content group', content)}
          theme={select('Theme', themes, themes.white)}
          title={title}
        />
      );
    });
}
