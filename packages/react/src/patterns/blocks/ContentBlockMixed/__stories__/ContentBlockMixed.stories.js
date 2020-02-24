import './index.scss';
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, object, withKnobs } from '@storybook/addon-knobs';
import ContentBlockMixed from '../ContentBlockMixed';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|Content Block Mixed', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = 'Lorem ipsum dolor sit amet';

    const cta = {
      cta: {
        href: 'https://www.example.com',
      },
      style: 'card',
      type: 'local',
      copy: 'Lorem ipsum dolor sit ametttt',
      heading: 'Lorem ipsum dolor',
    };

    const copy = `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `;

    const pictogramHeading =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const pictogramItems = [
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          cta: {
            href: 'https://www.example.com',
          },
          type: 'local',
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
          cta: {
            href: 'https://www.example.com',
          },
          type: 'local',
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
          cta: {
            href: 'https://www.example.com',
          },
          type: 'local',
          copy: 'Lorem ipsum dolor',
        },
        pictogram: {
          src: Touch,
          'aria-label': 'Touch',
        },
      },
    ];

    const simpleHeading = ContentGroupSimpleKnobs.heading;
    const simpleMediaData = ContentGroupSimpleKnobs.mediaData;
    const simpleTypes = ContentGroupSimpleKnobs.types;
    const simpleMediaType = simpleTypes.image;
    const simpleItems = ContentGroupSimpleKnobs.items;
    const simpleCta = ContentGroupSimpleKnobs.cta;

    const items = [
      {
        type: 'ContentGroupCards',
        heading: text('Card group heading', ContentGroupCardsKnobs.heading),
        items: object('Card group content', ContentGroupCardsKnobs.items),
      },
      {
        type: 'ContentGroupPictograms',
        heading: text('Pictogram group heading', pictogramHeading),
        items: object('Pictogram group content', pictogramItems),
      },
      {
        type: 'ContentGroupSimple',
        mediaType: simpleMediaType,
        mediaData: simpleMediaData,
        heading: text('Simple group heading', simpleHeading),
        items: object('Simple group content', simpleItems),
        cta: object('Simple group CTA', simpleCta),
      },
    ];

    return (
      <div className="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentBlockMixed
              heading={heading}
              copy={copy}
              cta={cta}
              items={items}
            />
          </div>
        </div>
      </div>
    );
  });
