/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import imgLg16x9 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';

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
  1. list "item 1a"
  2. list item 2a
      - list item 2a.a
1. list item 2
    - list item 2a
`;

const ContentGroupSimpleKnobs = {
  heading: 'Lorem ipsum dolor sit amet',
  copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.',
  mediaData: {
    image: {
      heading: 'Lorem ipsum dolor sit amet.',
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
      copy: 'Lorem ipsum dolor sit amet, *consectetur* adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy: copyWithList,
    },
    {
      heading: 'Lorem ipsum dolor sit amet.',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
    },
  ],
  cta: {
    cta: {
      href: 'https://www.example.com',
    },
    style: 'card',
    type: 'local',
    heading: 'Lorem ipsum dolor sit amet',
  },
};

export default ContentGroupSimpleKnobs;
