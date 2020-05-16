/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  select,
  object,
  text,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import ContentBlockSegmented from '../ContentBlockSegmented';
import { LinkList } from '../../../sub-patterns/LinkList';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default {
  title: 'Patterns (Blocks)|ContentBlockSegmented',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const heading = text('Heading', 'Lorem ipsum dolor sit amet.');

  const mediaType = select(
    'mediaType (optional)',
    ['image', 'video', 'none'],
    'image'
  );

  const image = {
    heading: 'Mauris iaculis eget dolor nec hendrerit.',
    image: {
      sources: [
        {
          src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
          breakpoint: 320,
        },
        {
          src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
          breakpoint: 400,
        },
        {
          src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
    },
  };

  const video = {
    videoId: '0_uka1msg4',
    showCaption: true,
  };

  const mediaData = mediaType === 'image' ? image : video;

  const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`;

  const ctaStyles = {
    text: 'text',
    card: 'card',
  };

  const ctaTypes = {
    external: 'external',
    jump: 'jump',
    local: 'local',
  };

  const cta = {
    cta: {
      href: 'https://www.example.com',
    },
    style: select('CTA style', ctaStyles, ctaStyles.card),
    type: select('CTA type', ctaTypes, ctaTypes.local),
    copy: 'Lorem ipsum dolor',
  };

  const items = [
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      image: image,
      copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
    },
  ];

  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentBlockSegmented
            copy={copy}
            cta={cta}
            heading={heading}
            mediaType={mediaType}
            mediaData={mediaData}
            items={object('Content items', items)}
          />
        </div>
      </div>
    </div>
  );
};

export const WithAsideElements = () => {
  const heading = 'Lorem ipsum dolor sit amet.';

  const mediaType = select(
    'mediaType (optional)',
    ['image', 'video', 'none'],
    'image'
  );

  const image = {
    heading: 'Mauris iaculis eget dolor nec hendrerit.',
    image: {
      sources: [
        {
          src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
          breakpoint: 320,
        },
        {
          src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
          breakpoint: 400,
        },
        {
          src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
    },
  };

  const video = {
    videoId: '0_uka1msg4',
    showCaption: true,
  };

  const mediaData = mediaType === 'image' ? image : video;

  const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`;

  const ctaStyles = {
    text: 'text',
    card: 'card',
  };

  const ctaTypes = {
    external: 'external',
    jump: 'jump',
    local: 'local',
  };

  const cta = {
    cta: {
      href: 'https://www.example.com',
    },
    style: select('CTA style', ctaStyles, ctaStyles.card),
    type: select('CTA type', ctaTypes, ctaTypes.local),
    copy: 'Lorem ipsum dolor',
  };

  const items = [
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      image: image,
      copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
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
    items: <LinkList {...linkListProps} />,
    border: boolean('border', false),
  };

  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockSegmented
            copy={copy}
            cta={cta}
            heading={heading}
            mediaType={mediaType}
            mediaData={mediaData}
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
