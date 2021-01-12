/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import img320_16x9 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--003.jpg';
import img480_16x9 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--003.jpg';
import img720_16x9 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--003.jpg';

/**
 * Knobs for CustomGroupSimple
 *
 * type {{}}
 */
const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
nulla quis, *consequat* libero. Here are
some common categories:

Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit. Aenean et ultricies est. Mauris iaculis eget
dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat __libero__.

- [list item link](https://www.ibm.com)
  1. list item 1a
  2. list item 2a
    - list item 2a.a
1. list item 2
  - list item 2a
`;

const ContentGroupSimpleKnobs = {
  heading: 'Lorem ipsum dolor sit amet',
  copy:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.',
  mediaData: {
    image: {
      heading: 'Lorem ipsum dolor sit amet.',
      image: {
        sources: [
          {
            src: img320_16x9,
            breakpoint: 320,
          },
          {
            src: img480_16x9,
            breakpoint: 400,
          },
          {
            src: img720_16x9,
            breakpoint: 672,
          },
        ],
        alt: 'Image alt text',
        defaultSrc: img720_16x9,
      },
    },
    video: {
      videoId: '1_9h94wo6b',
      showCaption: true,
    },
  },
  types: {
    image: 'image',
    video: 'video',
    none: 'none',
  },
  mediaType: {},
  items: [
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy:
        'Lorem ipsum dolor sit amet, *consectetur* adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy: copyWithList,
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
    },
  ],
  cta: {
    cta: {
      href: 'https://www.example.com',
    },
    style: 'card',
    type: 'local',
    copy: 'Lorem ipsum dolor sit ametttt',
  },
};

module.exports = ContentGroupSimpleKnobs;
