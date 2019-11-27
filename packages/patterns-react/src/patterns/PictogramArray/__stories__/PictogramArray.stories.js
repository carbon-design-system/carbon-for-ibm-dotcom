import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_PICTOGRAMARRAY } from '../../../internal/FeatureFlags';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/pictogramarray/index.scss';
import PictogramArray from '../PictogramArray';
import { Desktop, Touch, Pattern } from '@carbon/pictograms-react';
// import readme from '../README.md';

if (DDS_PICTOGRAMARRAY) {
  storiesOf('Content array with pictograms', module)
    .addDecorator(withKnobs)
    // .addParameters({
    //   readme: {
    //     sidebar: readme,
    //   },
    // })
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

      const selectedPictogram = [
        select(
          'Element 1 pictogram (required)',
          pictograms,
          pictograms.Desktop
        ),
        select('Element 2 pictogram (required)', pictograms, pictograms.Touch),
        select(
          'Element 3 pictogram (required)',
          pictograms,
          pictograms.Pattern
        ),
      ];

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
        },
      ];

      return (
        <div>
          <PictogramArray title={title} contentGroup={contentGroup}>
            {selectedPictogram.map(elem => {
              switch (elem) {
                case 'Desktop':
                  return <Desktop viewBox="8 8 32 32" height="80" width="80" />;
                case 'Touch':
                  return <Touch viewBox="8 8 32 32" height="80" width="80" />;
                case 'Pattern':
                  return <Pattern viewBox="8 8 32 32" height="80" width="80" />;
              }
            })}
          </PictogramArray>
        </div>
      );
    });
}
