/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, boolean } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ContentBlockMedia from '../ContentBlockMedia';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
nulla quis, *consequat* libero. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.`;

const ctaProps = {
  type: 'local',
  heading: 'Lorem ipsum dolor sit amet',
  card: {
    cta: {
      href: 'https://www.example.com',
      icon: {
        src: ArrowRight20,
      },
    },
    heading: 'Consectetur adipisicing elit',
    image: {
      defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
      alt: 'Image alt text',
    },
  },
};

const ctaChoices = {
  cta: ctaProps,
  none: null,
};

const simpleHeading = ContentGroupSimpleKnobs.heading;
const simpleMediaData = ContentGroupSimpleKnobs.mediaData.image;
const simpleTypes = ContentGroupSimpleKnobs.types;
const simpleMediaType = simpleTypes.image;
const simpleItems = ContentGroupSimpleKnobs.items;
const simpleCta = ContentGroupSimpleKnobs.cta;

export default {
  title: 'Components|ContentBlockMedia',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { copy, heading, items, cta } =
    parameters?.props?.ContentBlockMedia ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentBlockMedia
            copy={copy}
            heading={heading}
            items={items}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockMedia: ({ groupId }) => {
        const item = {
          mediaType: simpleMediaType,
          mediaData: simpleMediaData,
          heading: text(
            'Simple Group Heading (heading)',
            simpleHeading,
            groupId
          ),
          items: simpleItems,
          cta: simpleCta,
        };

        const items = [item, item];

        const cta = select(
          'Feature Link (optional)',
          ctaChoices,
          ctaChoices.cta,
          groupId
        );

        return {
          copy,
          heading: text(
            'Heading (heading)',
            'Curabitur malesuada varius mi eu posuere',
            groupId
          ),
          items,
          cta,
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockMedia: {
          items: [ContentGroupSimpleKnobs],
        },
      },
    },
  },
};

export const WithAsideElements = ({ parameters }) => {
  const { copy, heading, items, cta, aside } =
    parameters?.props?.ContentBlockMedia ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockMedia
            copy={copy}
            heading={heading}
            items={items}
            aside={aside}
            cta={cta}
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
      ContentBlockMedia: ({ groupId }) => {
        const item = {
          mediaType: simpleMediaType,
          mediaData: simpleMediaData,
          heading: simpleHeading,
          items: simpleItems,
          cta: simpleCta,
        };

        const items = [item, item];

        const linkListProps = {
          heading: text('Link List (heading)', 'Tutorials', groupId),
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
          border: boolean('border', false, groupId),
        };

        return {
          copy,
          heading: 'Curabitur malesuada varius mi eu posuere',
          items,
          cta: ctaChoices.cta,
          aside,
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockMedia: {
          items: [ContentGroupSimpleKnobs],
        },
      },
    },
  },
};
