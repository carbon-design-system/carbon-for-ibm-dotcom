import React from 'react';
import { storiesOf } from '@storybook/react';
import { LISTSECTION } from '../../../internal/FeatureFlags';
import {
  withKnobs,
  text,
  select,
  object,
  boolean,
} from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/listsection/index.scss';
import ListSection from '../ListSection';
import readme from '../README.md';

if (LISTSECTION) {
  storiesOf('List section', module)
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

      const listGroup = [
        {
          title: 'Aliquam condimentum interdum',
          lists: [
            {
              title: 'Nunc convallis lobortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Fusce gravida eu arcu',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
          ],
        },
        {
          title: ' Vivamus interdum ligula',
          lists: [
            {
              title: 'Consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Proin quis iaculis risus',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Sed vitae ligula ut',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
          ],
        },
        {
          title: 'Vivamus scelerisque orci at',
          lists: [
            {
              title: 'Convallis pretium molestie',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Aenean facilisis cursus nibh',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Aliquam tincidunt diam sit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
          ],
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      const withBorder = boolean('with border', true);

      return (
        <ListSection
          theme={select('theme', themes, themes.white)}
          title={title}
          copy={copy}
          border={withBorder}
          listGroup={object('listGroup', listGroup)}
        />
      );
    });
}
