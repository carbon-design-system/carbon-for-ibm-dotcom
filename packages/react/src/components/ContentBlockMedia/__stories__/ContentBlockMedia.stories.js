/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import ContentBlockMedia from '../ContentBlockMedia';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--003.jpg';
import { LinkList } from '../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
nulla quis, *consequat* libero. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.`;

const ctaProps = {
  heading: 'Lorem ipsum dolor sit amet',
  card: {
    type: 'external',
    cta: {
      href: 'https://www.example.com',
    },
    heading: 'Consectetur adipisicing elit',
    image: {
      defaultSrc: imgLg1x1,
      alt: 'Image alt text',
    },
  },
};

const ctaChoices = {
  CTA: ctaProps,
  none: null,
};

const borderOptions = {
  'Without border': false,
  // eslint-disable-next-line max-len
  'With border': true,
};

const simpleHeading = ContentGroupSimpleKnobs.heading;
const simpleMediaData = ContentGroupSimpleKnobs.mediaData.image;
const simpleTypes = ContentGroupSimpleKnobs.types;
const simpleMediaType = simpleTypes.image;
const simpleItems = ContentGroupSimpleKnobs.items;
const simpleCta = ContentGroupSimpleKnobs.cta;

export default {
  title: 'Components|Content block media',

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
          heading: text(
            'Simple Group Heading (heading)',
            simpleHeading,
            groupId
          ),
          mediaType: simpleMediaType,
          mediaData: simpleMediaData,
          items: simpleItems,
          cta: simpleCta,
        };

        const items = [item, item];

        return {
          copy,
          heading: text(
            'Heading (heading)',
            'Curabitur malesuada varius mi eu posuere',
            groupId
          ),

          items,
          cta: select(
            'Feature Link (optional)',
            ctaChoices,
            ctaChoices.CTA,
            groupId
          ),
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

export const WithLinkList = ({ parameters }) => {
  const { copy, heading, items, cta, aside } =
    parameters?.props?.ContentBlockMedia ?? {};
  console.log('rt', aside);
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

WithLinkList.story = {
  name: 'With Link list',
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
            {
              type: 'local',
              copy: 'Learn more about Kubernetes',
              cta: {
                href: 'https://ibm.com',
              },
            },
            {
              type: 'local',
              copy: 'Explore AI use cases in all industries',
              cta: {
                href: 'https://ibm.com',
              },
            },
          ],
          totalLinks: select('Number of links', [2, 3, 4], 2, groupId),
        };

        linkListProps.items = linkListProps.items.slice(
          0,
          linkListProps.totalLinks
        );

        const aside = {
          items: <LinkList style="card" {...linkListProps} />,
          border: select(
            'Container bottom border',
            borderOptions,
            borderOptions['With border'],
            groupId
          ),
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
