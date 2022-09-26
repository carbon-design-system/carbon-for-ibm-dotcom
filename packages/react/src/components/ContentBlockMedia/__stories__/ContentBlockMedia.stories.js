/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, boolean } from '@storybook/addon-knobs';
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
    cta: {
      type: 'external',
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

const simpleHeading = ContentGroupSimpleKnobs.heading;
const simpleMediaData = ContentGroupSimpleKnobs.mediaData.image;
const simpleTypes = ContentGroupSimpleKnobs.types;
const simpleMediaType = simpleTypes.image;
const simpleItems = ContentGroupSimpleKnobs.items;
const simpleCta = ContentGroupSimpleKnobs.cta;

export default {
  title: 'Components/Content block media',
  parameters: {
    ...readme.parameters,
  },
};

const props = {
  default: () => {
    const heading = text(
      'Heading (required)',
      'Curabitur malesuada varius mi eu posuere'
    );

    const item = {
      heading: text('Simple Group Heading (heading)', simpleHeading),
      mediaType: simpleMediaType,
      mediaData: simpleMediaData,
      items: simpleItems,
      cta: simpleCta,
    };

    const items = [item, item];

    const ctaKnob = select(
      'Feature Link (optional)',
      ctaChoices,
      ctaChoices.CTA
    );
    const cta = ctaKnob === null ? '' : ctaProps;

    return {
      copy,
      heading,
      items,
      cta,
      border: boolean('Border (border)', false),
    };
  },
  withLinkList: () => {
    const heading = text(
      'Heading (required)',
      'Curabitur malesuada varius mi eu posuere'
    );

    const item = {
      heading: text('Simple Group Heading (heading)', simpleHeading),
      mediaType: simpleMediaType,
      mediaData: simpleMediaData,
      items: simpleItems,
      cta: simpleCta,
    };

    const items = [item, item];

    const ctaKnob = select(
      'Feature Link (optional)',
      ctaChoices,
      ctaChoices.CTA
    );
    const cta = ctaKnob === null ? '' : ctaProps;

    const linkListProps = {
      heading: text('Link List (heading)', 'Tutorials'),
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
      totalLinks: select('Number of links', [2, 3, 4], 2),
    };

    linkListProps.items = linkListProps.items.slice(
      0,
      linkListProps.totalLinks
    );

    const aside = {
      items: <LinkList style="card" {...linkListProps} />,
    };

    return {
      copy,
      heading,
      items,
      cta,
      aside,
      border: boolean('Border (border)', false),
    };
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentBlockMedia {...props.default()} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    percy: {
      name: 'Components|Content block media: Default',
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

export const WithLinkList = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockMedia {...props.withLinkList()} />
        </div>
      </div>
    </div>
  );
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    percy: {
      name: 'Components|Content block media: With link list',
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
