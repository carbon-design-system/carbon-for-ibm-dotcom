/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  object,
  select,
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ContentBlockMedia from '../ContentBlockMedia';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentBlockMedia',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
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

  const cta = {
    cta: ctaProps,
    none: null,
  };

  const simpleHeading = ContentGroupSimpleKnobs.heading;
  const simpleMediaData = ContentGroupSimpleKnobs.mediaData.image;
  const simpleTypes = ContentGroupSimpleKnobs.types;
  const simpleMediaType = simpleTypes.image;
  const simpleItems = ContentGroupSimpleKnobs.items;
  const simpleCta = ContentGroupSimpleKnobs.cta;

  const items = [
    {
      mediaType: simpleMediaType,
      mediaData: object('Simple group media (image)', simpleMediaData),
      heading: text('Simple group heading', simpleHeading),
      items: object('Simple group content', simpleItems),
      cta: object('Simple group CTA', simpleCta),
    },
    {
      mediaType: simpleMediaType,
      mediaData: object('Simple group media (image)', simpleMediaData),
      heading: text('Simple group heading', simpleHeading),
      items: object('Simple group content', simpleItems),
      cta: object('Simple group CTA', simpleCta),
    },
  ];

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentBlockMedia
            copy={copy}
            heading={text(
              'Heading (required)',
              'Curabitur malesuada varius mi eu posuere'
            )}
            items={items}
            cta={select('Feature Link (optional)', cta, cta.cta)}
          />
        </div>
      </div>
    </div>
  );
};

export const WithAsideElements = () => {
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

  const cta = {
    cta: ctaProps,
    none: null,
  };

  const simpleHeading = ContentGroupSimpleKnobs.heading;
  const simpleMediaData = ContentGroupSimpleKnobs.mediaData.image;
  const simpleTypes = ContentGroupSimpleKnobs.types;
  const simpleMediaType = simpleTypes.image;
  const simpleItems = ContentGroupSimpleKnobs.items;
  const simpleCta = ContentGroupSimpleKnobs.cta;

  const items = [
    {
      mediaType: simpleMediaType,
      mediaData: simpleMediaData,
      heading: simpleHeading,
      items: simpleItems,
      cta: simpleCta,
    },
    {
      mediaType: simpleMediaType,
      mediaData: simpleMediaData,
      heading: simpleHeading,
      items: simpleItems,
      cta: simpleCta,
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
          <ContentBlockMedia
            copy={copy}
            heading={'Curabitur malesuada varius mi eu posuere'}
            items={items}
            aside={aside}
            cta={cta.cta}
          />
        </div>
      </div>
    </div>
  );
};

WithAsideElements.story = {
  name: 'With aside elements',
};
