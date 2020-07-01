/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, object, text, boolean } from '@storybook/addon-knobs';
import ContentBlockSegmented from '../ContentBlockSegmented';
import { LinkList } from '../../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

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

const mediaDataByType = {
  image,
  video: {
    videoId: '0_uka1msg4',
    showCaption: true,
  },
};

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

const defaultItems = [
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
    cta: {
      type: 'local',
      copy: 'Lorem Ipsum dolor sit',
      href: 'https://example.com',
    },
  },
  {
    heading: 'Lorem ipsum dolor sit amet.',
    image,
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
    cta: {
      type: 'local',
      copy: 'Lorem Ipsum dolor sit',
      href: 'https://example.com',
    },
  },
];

const defaultWithAsideElementsItems = [
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
  },
  {
    heading: 'Lorem ipsum dolor sit amet.',
    image,
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
  },
];

/**
 * @param {object} options The options.
 * @param {string} options.groupId The knob group ID.
 * @returns {object} The knobs data.
 */
const getBaseKnobs = ({ groupId }) => {
  const mediaType = select(
    'mediaType (optional)',
    ['image', 'video', 'none'],
    'image',
    groupId
  );
  return {
    mediaType,
    mediaData: mediaDataByType[mediaType],
    copy,
    cta: {
      cta: {
        href: 'https://www.example.com',
      },
      style: select('CTA style', ctaStyles, ctaStyles.card, groupId),
      type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
      copy: 'Lorem ipsum dolor',
    },
  };
};

export default {
  title: 'Patterns (Blocks)|ContentBlockSegmented',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { copy, cta, heading, mediaType, mediaData, items } =
    parameters?.props?.ContentBlockSegmented ?? {};
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
      ContentBlockSegmented: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          copy: text(
            'Copy',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
            groupId
          ),
          heading: text('Heading', 'Lorem ipsum dolor sit amet.', groupId),
          items: object('Content items', defaultItems, groupId),
        };
      },
    },
    props: {
      ContentBlockSegmented: {
        items: defaultItems,
      },
    },
  },
};

export const WithAsideElements = ({ parameters }) => {
  const { copy, cta, heading, mediaType, mediaData, items, aside } =
    parameters?.props?.ContentBlockSegmented ?? {};
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
  parameters: {
    knobs: {
      ContentBlockSegmented: ({ groupId }) => {
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

        const knobs = getBaseKnobs({ groupId });

        const items = object(
          'Content items',
          defaultWithAsideElementsItems,
          groupId
        );

        const result = {
          ...knobs,
          heading: 'Lorem ipsum dolor sit amet.',
          // The URL in the JSON from the knob gets `&amp`
          items: items.map(item => {
            return {
              ...item,
              image: !item.image
                ? undefined
                : {
                    ...item.image,
                    image: !item.image.image
                      ? undefined
                      : {
                          ...item.image.image,
                          sources: item.image.image.sources?.map(item => ({
                            ...item,
                            src: item.src?.replace(/&amp;/g, '&'),
                          })),
                          defaultSrc: item.image.image.defaultSrc?.replace(
                            /&amp;/g,
                            '&'
                          ),
                        },
                  },
            };
          }),
          aside,
        };

        return result;
      },
    },
    props: {
      ContentBlockSegmented: {
        items: defaultWithAsideElementsItems,
      },
    },
  },
};
