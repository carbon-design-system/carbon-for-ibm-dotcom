import './index.scss';
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import {
  text,
  object,
  select,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import ContentBlockMixed from '../ContentBlockMixed';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../../sub-patterns/LinkList';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|ContentBlockMixed', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = 'Lorem ipsum dolor sit amet';

    const ctaTypes = {
      local: 'local',
      jump: 'jump',
      external: 'external',
    };

    const ctaProps = {
      cta: {
        href: 'https://www.ibm.com',
      },
      style: 'card',
      type: select('CTA type', ctaTypes, ctaTypes.local),
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

    const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.`;

    const pictogramHeading =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const pictogramItems = [
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          href: 'https://www.ibm.com',
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
          href: 'https://www.ibm.com',
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
          href: 'https://www.ibm.com',
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
        mediaData: simpleMediaData.image,
        heading: text('Simple group heading', simpleHeading),
        items: object('Simple group content', simpleItems),
      },
    ];

    // Render right panels elements
    const showAside = boolean('Render aside elements', false);

    const linkListProps = showAside && {
      heading: text('link list heading:', 'Tutorials'),
      items: object('link list items array', [
        {
          type: 'local',
          copy: 'Containerization A Complete Guide',
          cta: {
            href: 'https://ibm.com',
          },
        },
        {
          type: 'external',
          copy: 'Why should you use microservices and containers',
          cta: {
            href: 'https://ibm.com',
          },
        },
      ]),
    };

    const aside = showAside && {
      items: <LinkList {...linkListProps} />,
      border: boolean('border', false),
    };

    return (
      <div className="bx--grid">
        <div class="bx--row">
          <div
            class={
              showAside
                ? 'bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4'
                : 'bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4'
            }>
            <ContentBlockMixed
              heading={heading}
              copy={copy}
              cta={ctaProps}
              items={items}
              aside={aside}
            />
          </div>
        </div>
      </div>
    );
  });
