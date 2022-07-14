/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, select, boolean } from '@storybook/addon-knobs';
import ContentBlockMixed from '../ContentBlockMixed';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const heading = 'Lorem ipsum dolor sit amet';

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
    Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
    nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.`;

const pictogramHeading =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

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

const props = {
  default: () => {
    const items = [
      {
        type: 'ContentGroupCards',
        heading: text(
          'Card group heading (heading):',
          ContentGroupCardsKnobs.heading
        ),
        items: ContentGroupCardsKnobs.items,
      },
      {
        type: 'ContentGroupPictograms',
        heading: text('Pictogram group heading (heading):', pictogramHeading),
        items: pictogramItems,
      },
      {
        type: 'ContentGroupSimple',
        mediaType: simpleMediaType,
        mediaData: simpleMediaData.image,
        heading: text('Simple group heading (heading):', simpleHeading),
        items: simpleItems,
      },
    ];

    return {
      heading: heading,
      copy: copy,
      cta: {
        cta: {
          href: 'https://www.ibm.com',
        },
        style: 'card',
        type: select('CTA type', ctaTypes, ctaTypes.local),
        heading: 'Lorem ipsum dolor sit ametttt',
      },
      items,
      border: boolean('Border (border)', false),
    };
  },
  WithLinkList: () => {
    const linkListProps = {
      heading: text('link list heading:', 'Tutorials'),
      items: [
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
      ],
    };

    const aside = {
      items: <LinkList style="card" {...linkListProps} />,
    };

    return {
      ...props.default(),
      aside,
      border: boolean('Border (border)', false),
    };
  },
};

export default {
  title: 'Components/Content block mixed',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentBlockMixed {...props.default()} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    propsSet: {
      default: {
        ContentBlockMixed: {
          items: [
            {
              ...ContentGroupSimpleKnobs,
              type: 'ContentGroupSimple',
            },
          ],
        },
      },
    },
  },
};

export const WithLinkList = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockMixed {...props.WithLinkList()} />
        </div>
      </div>
    </div>
  );
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    propsSet: {
      default: {
        ContentBlockMixed: {
          items: [
            {
              ...ContentGroupSimpleKnobs,
              type: 'ContentGroupSimple',
            },
          ],
        },
      },
    },
  },
};
