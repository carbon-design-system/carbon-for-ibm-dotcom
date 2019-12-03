import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_PICTOGRAM_ARRAY } from '../../../internal/FeatureFlags';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/pictogramarray/index.scss';
import PictogramArray from '../PictogramArray';
import readme from '../README.md';

if (DDS_PICTOGRAM_ARRAY) {
  storiesOf('Content array with pictograms', module)
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
          pictogram: select(
            'Element 1 pictogram (required)',
            pictograms,
            pictograms.Desktop
          ),
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
          pictogram: select(
            'Element 2 pictogram (required)',
            pictograms,
            pictograms.Touch
          ),
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
          pictogram: select(
            'Element 3 pictogram (required)',
            pictograms,
            pictograms.Pattern
          ),
        },
      ];

      return (
        <div>
          <PictogramArray title={title} contentGroup={contentGroup} />
        </div>
      );
    });
}
