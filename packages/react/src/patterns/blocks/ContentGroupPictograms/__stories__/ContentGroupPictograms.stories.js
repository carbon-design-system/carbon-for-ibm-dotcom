import './index.scss';
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import classNames from 'classnames';
import ContentGroupPictograms from '../ContentGroupPictograms';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|ContentGroupPictograms', module)
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

    const heading = text(
      'Pattern title (required)',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );

    const items = [
      {
        heading: text(
          'Item 1 Heading (required)',
          'Aliquam condimentum interdum'
        ),
        copy: text(
          'Item 1 Copy (required)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
        ),
        cta: object('Item 1 Link', {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        }),
        pictogram: {
          src: selectPictogram(pictogram1),
          'aria-label': text('Aria-label 1:', 'Desktop'),
        },
      },
      {
        heading: text(
          'Item 2 Heading (required)',
          'Aliquam condimentum interdum'
        ),
        copy: text(
          'Item 2 Copy (required)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
        ),
        cta: object('Item 2 Link', {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        }),
        pictogram: {
          src: selectPictogram(pictogram2),
          'aria-label': text('Aria-label 2:', 'Touch'),
        },
      },
      {
        heading: text(
          'Item 3 Heading (required)',
          'Aliquam condimentum interdum'
        ),
        copy: text(
          'Item 3 Copy (required)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.'
        ),
        cta: object('Item 3 Link', {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        }),
        pictogram: {
          src: selectPictogram(pictogram3),
          'aria-label': text('Aria-label 3:', 'Pattern'),
        },
      },
    ];

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <ContentGroupPictograms
            className={classNames(
              `bx--col-sm-4`,
              `bx--col-lg-8`,
              `bx--offset-lg-4`
            )}
            heading={heading}
            items={items}
          />
        </div>
      </div>
    );
  });
