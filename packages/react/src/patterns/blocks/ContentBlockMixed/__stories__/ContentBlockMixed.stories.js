/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentBlockMixed',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
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

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentBlockMixed
            heading={heading}
            copy={copy}
            cta={ctaProps}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export const WithAsideElements = () => {
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
      heading: ContentGroupCardsKnobs.heading,
      items: ContentGroupCardsKnobs.items,
    },
    {
      type: 'ContentGroupPictograms',
      heading: pictogramHeading,
      items: pictogramItems,
    },
    {
      type: 'ContentGroupSimple',
      mediaType: simpleMediaType,
      mediaData: simpleMediaData.image,
      heading: simpleHeading,
      items: simpleItems,
    },
  ];

  const linkListProps = {
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

  const aside = {
    items: <LinkList style="card" {...linkListProps} />,
    border: boolean('border', false),
  };

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
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
};

WithAsideElements.story = {
  name: 'With aside elements',
};
