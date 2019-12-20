import './index.scss';
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_PICTOGRAM_ARRAY } from '../../../internal/FeatureFlags';
import PictogramArray from '../PictogramArray';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_PICTOGRAM_ARRAY) {
  storiesOf('PictogramArray', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const pictograms = {
        Desktop: 'Desktop',
        Touch: 'Touch',
        Pattern: 'Pattern',
      };

      const pictogram1 = select(
        'Element 1 pictogram (required)',
        pictograms,
        pictograms.Desktop
      );

      const pictogram2 = select(
        'Element 2 pictogram (required)',
        pictograms,
        pictograms.Touch
      );

      const pictogram3 = select(
        'Element 3 pictogram (required)',
        pictograms,
        pictograms.Pattern
      );

      /**
       * Returns the react component based on the value in the pictogram variables
       *
       * @param {string} sel string that defines the returning pictogram
       * @returns {*} JSX pictogram component
       */
      const selectPictogram = sel => {
        switch (sel) {
          case 'Desktop':
            return Desktop;
          case 'Pattern':
            return Pattern;
          case 'Touch':
            return Touch;
        }
      };

      const title = text(
        'Pattern title (required)',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      );

      const contentGroup = [
        {
          title: text(
            'Element 1 Title (required)',
            'Aliquam condimentum interdum'
          ),
          copy: text(
            'Element 1 Copy (required)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 1 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
          pictogram: selectPictogram(pictogram1),
        },
        {
          title: text(
            'Element 2 Title (required)',
            'Aliquam condimentum interdum'
          ),
          copy: text(
            'Element 2 Copy (required)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 2 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
          pictogram: selectPictogram(pictogram2),
        },
        {
          title: text(
            'Element 3 Title (required)',
            'Aliquam condimentum interdum'
          ),
          copy: text(
            'Element 3 Copy (required)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
          ),
          link: object('Element 3 Link', {
            href: 'https://www.example.com',
            text: 'Learn more',
            target: '_self',
          }),
          pictogram: selectPictogram(pictogram3),
        },
      ];

      return (
        <div>
          <PictogramArray title={title} contentGroup={contentGroup} />
        </div>
      );
    });
}
