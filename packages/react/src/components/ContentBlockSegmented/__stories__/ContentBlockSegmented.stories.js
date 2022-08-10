/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import ContentBlockSegmented from '../ContentBlockSegmented';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import { LinkList } from '../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const borderOptions = {
  'Without border': false,
  // eslint-disable-next-line max-len
  'With border': true,
};

const image = {
  heading: 'Mauris iaculis eget dolor nec hendrerit.',
  image: {
    sources: [
      {
        src: imgSm16x9,
        breakpoint: 320,
      },
      {
        src: imgMd16x9,
        breakpoint: 400,
      },
      {
        src: imgLg16x9,
        breakpoint: 672,
      },
    ],
    alt: 'Image alt text',
    defaultSrc: imgLg16x9,
  },
};

const ctaStyles = {
  text: 'text',
  card: 'card',
};

const ctaTypes = {
  external: 'external',
  jump: 'jump',
  local: 'local',
};

const video = {
  videoId: '1_9h94wo6b',
  showCaption: true,
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
    video,
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
 * @returns {object} The knobs data.
 */
const getBaseKnobs = () => {
  return {
    heading: text('Heading (heading):', 'Lorem ipsum dolor sit amet.'),
    copy: text(
      'Copy (copy):',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.'
    ),
  };
};

/**
 * @returns {object} The knobs data.
 */
const getCTAKnobs = () => {
  return {
    cta: {
      cta: {
        href: 'https://www.example.com',
      },
      style: select('CTA style (style):', ctaStyles, ctaStyles.card),
      type: select('CTA type (type):', ctaTypes, ctaTypes.local),
      heading: 'Lorem ipsum dolor',
      copy: 'Lorem ipsum dolor',
    },
  };
};

const props = {
  default: () => {
    const knobs = getBaseKnobs();
    const ctaKnobs = getCTAKnobs();
    if (ctaKnobs.cta.style === 'card') {
      delete ctaKnobs.cta.copy;
    } else {
      delete ctaKnobs.cta.heading;
    }

    return {
      ...knobs,
      ...ctaKnobs,
      items: defaultItems,
      border: select(
        'Container bottom border',
        borderOptions,
        borderOptions['With border']
      ),
    };
  },
  WithLinkList: () => {
    const knobs = getBaseKnobs();
    const items = defaultItems;

    const linkListProps = {
      heading: text('Link list heading (heading):', 'Tutorials'),
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

    const ctaKnobs = getCTAKnobs();
    if (ctaKnobs.cta.style === 'card') {
      delete ctaKnobs.cta.copy;
    } else {
      delete ctaKnobs.cta.heading;
    }

    const aside = {
      items: <LinkList style="card" {...linkListProps} />,
      border: select(
        'Container bottom border',
        borderOptions,
        borderOptions['With border']
      ),
    };

    const result = {
      ...knobs,
      ...ctaKnobs,
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
};

export default {
  title: 'Components/Content block segmented',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Content block segmented: Default',
    },
  },
};

export const Default = () => {
  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentBlockSegmented {...props.default()} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    propsSet: {
      default: {
        ContentBlockSegmented: {
          items: defaultItems,
        },
      },
    },
  },
};

export const WithLinkList = () => {
  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockSegmented {...props.WithLinkList()} />
        </div>
      </div>
    </div>
  );
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    percy: {
      name: 'Components|Content block segmented: With link list',
    },
    propsSet: {
      default: {
        ContentBlockSegmented: {
          items: defaultWithAsideElementsItems,
        },
      },
    },
  },
};
