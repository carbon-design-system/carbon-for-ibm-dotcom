import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CONTENTARRAYWITHPICTOGRAMS } from '../../../internal/FeatureFlags';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/contentarraywithpictograms/index.scss';
import ContentArrayWithPictograms from '../ContentArrayWithPictograms';
// import readme from '../README.md';

if (DDS_CONTENTARRAYWITHPICTOGRAMS) {
  storiesOf('Content array with pictograms', module)
    .addDecorator(withKnobs)
    // .addParameters({
    //   readme: {
    //     sidebar: readme,
    //   },
    // })
    .add('Default', () => {
      const title = text(
        'title (required)',
        'Curabitur malesuada varius mi eu posuere'
      );

      const contentGroup = [
        {
          title: 'Aliquam condimentum interdum',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          pictogram: 'Airplane',
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
          pictogram: 'Airplane',
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
          pictogram: 'Airplane',
          link: {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          },
        },
      ];

      return (
        <div>
          <ContentArrayWithPictograms
            title={title}
            contentGroup={object('contentGroup', contentGroup)}
          />
        </div>
      );
    });
}
