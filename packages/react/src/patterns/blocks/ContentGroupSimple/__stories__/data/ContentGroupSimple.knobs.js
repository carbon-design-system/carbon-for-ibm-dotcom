/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Knobs for CustomGroupSimple
 *
 * type {{}}
 */

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
nulla quis, *consequat* libero. Here are
some common categories:

> blockquote 1
> blockquote 2

# heading

Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

- [list item](https://www.ibm.com)
  1. list item 1a
1. list item 2
  - list item 2a
`;

const ContentGroupSimpleKnobs = {
  heading: 'Lorem ipsum dolor sit amet',
  mediaData: {
    image: {
      heading: 'Lorem ipsum dolor sit amet.',
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
    },
    video: {
      videoId: '0_uka1msg4',
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
