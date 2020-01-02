import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { DDS_USECASES } from '../../../internal/FeatureFlags';
import React from 'react';
import UseCases from '../UseCases';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_USECASES) {
  storiesOf('Use Cases', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'title (required)',
        'Curabitur malesuada varius mi eu posuere'
      );

      const copy = text(
        'copy (required)',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
         Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
         nulla quis, consequat libero. Here are
         some common categories:
        `
      );

      const usecaseGroup = [
        {
          title: 'Aliquam condimentum interdum',
          image: {
            uri: {
              sm: 'https://via.placeholder.com/640x320',
              md: 'https://via.placeholder.com/768x384',
              lg: 'https://via.placeholder.com/1024x512',
            },
            alt: 'Place Holder Image',
          },
          lists: [
            {
              title: 'Nunc convallis lobortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            },
            {
              title: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            },
          ],
          link: {
            href: 'https://www.example.com',
            title: 'Vivamus interdum ligula',
            target: '_self',
          },
        },
        {
          title: ' Vivamus interdum ligula',
          image: {
            uri: {
              sm: 'https://via.placeholder.com/640x320',
              md: 'https://via.placeholder.com/768x384',
              lg: 'https://via.placeholder.com/1024x512',
            },
            alt: 'Place Holder Image',
          },
          lists: [
            {
              title: 'Consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            },
            {
              title: 'Proin quis iaculis risus',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            },
          ],
          link: {
            href: 'https://www.example.com',
            title: 'Lorem ipsum dolor sit',
            target: '_self',
          },
        },
        {
          title: 'Vivamus scelerisque orci at',
          image: {
            uri: {
              sm: 'https://via.placeholder.com/640x320',
              md: 'https://via.placeholder.com/768x384',
              lg: 'https://via.placeholder.com/1024x512',
            },
            alt: 'Place Holder Image',
          },
          lists: [
            {
              title: 'Convallis pretium molestie',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            },
            {
              title: 'Aliquam tincidunt diam sit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                title: 'Learn more',
                target: '_self',
              },
            },
          ],
          link: {
            href: 'https://www.example.com',
            title: 'Aliquam condimentum interdum',
            target: '_self',
          },
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      const withBorder = boolean('with border', true);

      return (
        <UseCases
          border={withBorder}
          copy={copy}
          theme={select('theme', themes, themes.white)}
          title={title}
          usecaseGroup={object('usecaseGroup', usecaseGroup)}
        />
      );
    });
}
