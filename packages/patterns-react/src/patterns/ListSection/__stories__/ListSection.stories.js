import React from 'react';
import { storiesOf } from '@storybook/react';
import { LISTSECTION } from '../../../internal/FeatureFlags';
import { withKnobs, text, select, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/listsection/index.scss';
import ListSection from '../ListSection';
import readme from '../README.md';

if (LISTSECTION) {
  storiesOf('List section', module)
    .addDecorator(
      withKnobs({
        escapeHTML: true,
      })
    )
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
                target: 'self',
              },
            },
            {
              title: 'Fusce gravida eu arcu',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
              },
            },
            {
              title: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
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
                target: 'self',
              },
            },
            {
              title: 'Proin quis iaculis risus',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
              },
            },
            {
              title: 'Sed vitae ligula ut',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
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
                target: 'self',
              },
            },
            {
              title: 'Aenean facilisis cursus nibh',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
              },
            },
            {
              title: 'Aliquam tincidunt diam sit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                target: 'self',
              },
            },
          ],
        },
      ];

      const themes = {
        'dark (g100)': 'g100',
        'light (white)': '',
      };

      return (
        <div
          className={`bx--listsection--${select(
            'theme',
            themes,
            themes['dark (g100)']
          )}`}>
          <ListSection
            title={title}
            copy={copy}
            listGroup={object('listGroup', listGroup)}
          />
        </div>
      );
    });
}
