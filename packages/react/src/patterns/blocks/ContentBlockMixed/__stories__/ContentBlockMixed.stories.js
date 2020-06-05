/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import { text, object, select, boolean } from '@storybook/addon-knobs';
import ContentBlockMixed from '../ContentBlockMixed';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../../../components/LinkList';
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

export default {
  title: 'Patterns (Blocks)|ContentBlockMixed',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { cta, items } = parameters?.props?.ContentBlockMixed ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
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
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockMixed: ({ groupId }) => {
        const items = [
          {
            type: 'ContentGroupCards',
            heading: text(
              'Card group heading',
              ContentGroupCardsKnobs.heading,
              groupId
            ),
            items: object(
              'Card group content',
              ContentGroupCardsKnobs.items,
              groupId
            ),
          },
          {
            type: 'ContentGroupPictograms',
            heading: text('Pictogram group heading', pictogramHeading, groupId),
            items: object('Pictogram group content', pictogramItems, groupId),
          },
          {
            type: 'ContentGroupSimple',
            mediaType: simpleMediaType,
            mediaData: simpleMediaData.image,
            heading: text('Simple group heading', simpleHeading, groupId),
            items: object('Simple group content', simpleItems, groupId),
          },
        ];

        return {
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'card',
            type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
            copy: 'Lorem ipsum dolor sit ametttt',
          },
          items,
        };
      },
    },
  },
};

export const WithAsideElements = ({ parameters }) => {
  const { cta, items, aside } = parameters?.props?.ContentBlockMixed ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockMixed
            heading={heading}
            copy={copy}
            cta={cta}
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
  parameters: {
    knobs: {
      ContentBlockMixed: ({ groupId }) => {
        const knobs = Default.story.parameters.knobs.ContentBlockMixed({
          groupId,
        });

        const linkListProps = {
          heading: text('link list heading:', 'Tutorials', groupId),
          items: object(
            'link list items array',
            [
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
            groupId
          ),
        };

        const aside = {
          items: <LinkList style="card" {...linkListProps} />,
          border: boolean('border', false, groupId),
        };

        return {
          ...knobs,
          aside,
        };
      },
    },
  },
};
