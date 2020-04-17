/**
 * Knobs for CustomGroupSimple
 *
 * type {{}}
 */

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
      showDescription: true,
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
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
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
