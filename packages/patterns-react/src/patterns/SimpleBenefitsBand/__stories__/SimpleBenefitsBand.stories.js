import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_SIMPLEBENEFITSBAND } from '../../../internal/FeatureFlags';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import './index.scss';
import SimpleBenefitsBand from '../SimpleBenefitsBand';
import readme from '../README.md';

if (DDS_SIMPLEBENEFITSBAND) {
  storiesOf('Simple Benefits Band', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text('Pattern title (required)', 'Lorem ipsum');
      const contentGroup = [
        {
          title: text('Element 1 Title', 'Aliquam condimentum interdum'),
          copy: text(
            'Element 1 Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 1 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
        {
          title: text('Element 2 Title', 'Aliquam'),
          copy: text(
            'Element 2 Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 2 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
        {
          title: text('Element 3 Title', 'Aliquam condimentum interdum'),
          copy: text(
            'Element 3 Copy',
            'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Aenean et ultricies est. Aenean et ultricies est.'
          ),
          link: object('Element 3 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
        {
          title: text(
            'Element 4 Title',
            'Aliquam condimentum interdum ultricies est'
          ),
          copy: text(
            'Element 4 Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.'
          ),
          link: object('Element 4 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
        {
          title: text('Element 5 Title', 'Aliquam condimentum interdum'),
          copy: text(
            'Element 5 Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 5 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
        {
          title: text('Element 6 Title', 'Aliquam condimentum interdum'),
          copy: text(
            'Element 6 Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 6 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
        },
      ];

      return <SimpleBenefitsBand title={title} contentGroup={contentGroup} />;
    });
}
