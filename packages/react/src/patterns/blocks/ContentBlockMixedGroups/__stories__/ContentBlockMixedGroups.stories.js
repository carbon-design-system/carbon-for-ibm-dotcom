import './index.scss';
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { withKnobs, select } from '@storybook/addon-knobs';
import ContentBlockMixedGroups from '../ContentBlockMixedGroups';
import { ContentGroupCards } from '../../ContentGroupCards';
import ContentGroupCardsKnobs from '../../ContentGroupCards/data/ContentGroupCards.knobs';
import { ContentGroupPictograms } from '../../ContentGroupPictograms';
import { ContentGroupSimple } from '../../ContentGroupSimple';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|Content Block Mixed Groups', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = 'Lorem ipsum dolor sit amet';

    const cta = {
      style: 'text',
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit ametttt',
      title: 'Lorem ipsum dolor',
    };

    const copy = {
      'single paragraph': `Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:`,
      'multiple paragraphs': `   Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      'multiple paragraphs (styled)': `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      none: null,
    };

    const simpleHeading = ContentGroupSimpleKnobs.heading;
    const simpleMediaData = ContentGroupSimpleKnobs.mediaData;
    const simpleTypes = ContentGroupSimpleKnobs.types;
    const simpleMediaType = simpleTypes.image;
    const simpleItems = ContentGroupSimpleKnobs.items;
    const simpleCta = ContentGroupSimpleKnobs.cta;

    const pictogramHeading =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const pictogramItems = [
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        pictogram: {
          src: Desktop,
          'aria-label': 'Desktop',
        },
      },
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        pictogram: {
          src: Pattern,
          'aria-label': 'Pattern',
        },
      },
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        pictogram: {
          src: Touch,
          'aria-label': 'Touch',
        },
      },
    ];

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <ContentBlockMixedGroups
            heading={heading}
            copy={select('Copy (optional)', copy, copy['single paragraph'])}
            cta={cta}>
            <ContentGroupCards
              heading={ContentGroupCardsKnobs.heading}
              items={ContentGroupCardsKnobs.items}
            />
            <ContentGroupPictograms
              heading={pictogramHeading}
              items={pictogramItems}
            />
            <ContentGroupSimple
              mediaType={simpleMediaType}
              mediaData={simpleMediaData}
              heading={simpleHeading}
              items={simpleItems}
              cta={simpleCta}
            />
          </ContentBlockMixedGroups>
        </div>
      </div>
    );
  });
