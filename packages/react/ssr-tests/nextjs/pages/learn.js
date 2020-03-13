/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import { Desktop, Pattern, Touch } from '@carbon/pictograms-react';
import {
  TableOfContents,
  LeadSpace,
  Layout,
  ContentBlockMedia,
  LinkList,
  ContentBlockMixed,
  ContentBlockSegmented,
  ContentBlockSimple,
  CardSectionImages,
  CardSectionSimple,
} from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';
import React from 'react';

/**
 * Learn template
 *
 * @returns {*} JSX for Learn template
 */
const Learn = () => (
  <>
    <LeadSpace
      type="centered"
      theme="g100"
      title="Lead space title"
      copy="Use this area for a short line of copy to support the title"
      gradient={true}
      // buttons={buttons}
      image={{
        sources: [
          {
            src: 'https://dummyimage.com/320x370/ee5396/161616',
            breakpoint: 'sm',
          },
          {
            src: 'https://dummyimage.com/672x400/ee5396/161616',
            breakpoint: 'md',
          },
        ],
        defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
        alt: 'Image alt text',
      }}
    />
    <TableOfContents menuLabel="Jump to" theme="white" stickyOffset={48}>
      <Layout nested={true} type="2-1" border={true}>
        <div>
          <a name="1" data-title="Lorem ipsum dolor sit amet"></a>
          <ContentBlockMixed
            heading="Lorem ipsum dolor sit amet"
            copy="Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
          Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
          nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
            cta={{
              cta: {
                href: 'https://www.example.com',
              },
              style: 'card',
              type: 'local',
              copy: 'Lorem ipsum dolor sit ametttt',
            }}
            items={[
              {
                type: 'ContentGroupCards',
                heading: 'Lorem ipsum dolor sit amet.',
                items: [
                  {
                    heading:
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    cta: {
                      href: 'https://www.example.com',
                    },
                  },
                  {
                    heading:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    cta: {
                      href: 'https://www.example.com',
                    },
                  },
                  {
                    heading:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    copy: 'Lorem ipsum dolor sit amet',
                    cta: {
                      href: 'https://www.example.com',
                    },
                  },
                  {
                    heading:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                    cta: {
                      href: 'https://www.example.com',
                    },
                  },
                ],
              },
              {
                type: 'ContentGroupPictograms',
                heading:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                items: [
                  {
                    heading: 'Aliquam condimentum interdum',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
                    cta: {
                      cta: {
                        href: 'https://www.example.com',
                      },
                      type: 'local',
                      copy: 'Lorem ipsum dolor',
                    },
                    pictogram: {
                      src: Desktop,
                      'aria-label': 'Desktop',
                    },
                  },
                  {
                    heading: 'Aliquam condimentum interdum',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
                    cta: {
                      cta: {
                        href: 'https://www.example.com',
                      },
                      type: 'local',
                      copy: 'Lorem ipsum dolor',
                    },
                    pictogram: {
                      src: Pattern,
                      'aria-label': 'Pattern',
                    },
                  },
                  {
                    heading: 'Aliquam condimentum interdum',
                    copy:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
                    cta: {
                      cta: {
                        href: 'https://www.example.com',
                      },
                      type: 'local',
                      copy: 'Lorem ipsum dolor',
                    },
                    pictogram: {
                      src: Touch,
                      'aria-label': 'Touch',
                    },
                  },
                ],
              },
              {
                type: 'ContentGroupSimple',
                mediaType: 'image',
                mediaData: {
                  heading: 'Lorem ipsum dolor sit amet.',
                  image: {
                    sources: [
                      {
                        src:
                          'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                        breakpoint: 320,
                      },
                      {
                        src:
                          'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                        breakpoint: 400,
                      },
                      {
                        src:
                          'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                        breakpoint: 672,
                      },
                    ],
                    alt: 'Image alt text',
                    defaultSrc:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                  },
                },
                heading: 'Lorem ipsum dolor sit amet',
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
              },
            ]}
          />
        </div>
        <div>
          <LinkList
            heading="Tutorials"
            items={[
              {
                type: 'local',
                copy: 'Containerization A Complete Guide',
                cta: {
                  href: 'https://ibm.com',
                },
              },
              {
                type: 'local',
                copy: 'Why should you use microservices and containers',
                cta: {
                  href: 'https://example.com',
                },
              },
            ]}
          />
        </div>
      </Layout>
      <Layout nested={true} type="2-1" border={true}>
        <div>
          <a name="2" data-title="Consectetur adipiscing elit"></a>
          <ContentBlockSegmented
            copy="Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
          Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
          nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit."
            cta={{
              cta: {
                href: 'https://www.example.com',
              },
              style: 'card',
              type: 'local',
              copy: 'Lorem ipsum dolor',
            }}
            heading="Lorem ipsum dolor sit amet."
            image={{
              heading: 'Mauris iaculis eget dolor nec hendrerit.',
              image: {
                sources: [
                  {
                    src:
                      'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                    breakpoint: 320,
                  },
                  {
                    src:
                      'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                    breakpoint: 400,
                  },
                  {
                    src:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                    breakpoint: 672,
                  },
                ],
                alt: 'Image alt text',
                defaultSrc:
                  'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
              },
            }}
            items={[
              {
                heading: 'Lorem ipsum dolor sit amet.',
                copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
              },
              {
                heading: 'Lorem ipsum dolor sit amet.',
                image: {
                  heading: 'Mauris iaculis eget dolor nec hendrerit.',
                  image: {
                    sources: [
                      {
                        src:
                          'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                        breakpoint: 320,
                      },
                      {
                        src:
                          'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                        breakpoint: 400,
                      },
                      {
                        src:
                          'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                        breakpoint: 672,
                      },
                    ],
                    alt: 'Image alt text',
                    defaultSrc:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                  },
                },
                copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
              },
            ]}
          />
        </div>
        <div></div>
      </Layout>
      <Layout nested={true} type="2-1" border={true}>
        <div>
          <a name="aenean" data-title="Aenean et ultricies est"></a>
          <ContentBlockSimple
            copy="Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
          Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
          nulla quis, *consequat* libero. Here are
          some common categories:

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
            heading="Curabitur malesuada varius mi eu posuere"
            image={{
              heading:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              image: {
                sources: [
                  {
                    src:
                      'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                    breakpoint: 320,
                  },
                  {
                    src:
                      'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                    breakpoint: 400,
                  },
                  {
                    src:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                    breakpoint: 672,
                  },
                ],
                alt: 'Image alt text',
                defaultSrc:
                  'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
              },
            }}
            cta={{
              cta: {
                href: 'https://www.ibm.com',
              },
              style: 'card',
              type: 'external',
              heading: 'Lorem ipsum dolor sit amet',
              copy: 'Lorem ipsum dolor sit ametttt',
            }}
          />
        </div>
        <div></div>
      </Layout>
      <Layout nested={true} type="2-1" border={true}>
        <div>
          <a
            name="curabitur"
            data-title="Curabitur malesuada varius mi eu posuere"
          />
          <ContentBlockMedia
            copy="Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean
            et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
            elit sollicitudin, sodales nulla quis, *consequat* libero. Phasellus at
            elit sollicitudin, sodales nulla quis, consequat libero."
            heading="Curabitur malesuada varius mi eu posuere"
            items={[
              {
                mediaType: 'image',
                mediaData: {
                  heading: 'Lorem ipsum dolor sit amet.',
                  image: {
                    sources: [
                      {
                        src:
                          'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                        breakpoint: 320,
                      },
                      {
                        src:
                          'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                        breakpoint: 400,
                      },
                      {
                        src:
                          'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                        breakpoint: 672,
                      },
                    ],
                    alt: 'Image alt text',
                    defaultSrc:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                  },
                },
                heading: 'Lorem ipsum dolor sit amet',
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
              },
              {
                mediaType: 'image',
                mediaData: {
                  heading: 'Lorem ipsum dolor sit amet.',
                  image: {
                    sources: [
                      {
                        src:
                          'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
                        breakpoint: 320,
                      },
                      {
                        src:
                          'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
                        breakpoint: 400,
                      },
                      {
                        src:
                          'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                        breakpoint: 672,
                      },
                    ],
                    alt: 'Image alt text',
                    defaultSrc:
                      'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
                  },
                },
                heading: 'Lorem ipsum dolor sit amet',
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
              },
            ]}
            cta={{
              type: 'feature',
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
                  defaultSrc:
                    'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
                  alt: 'Image alt text',
                },
              },
            }}
          />
        </div>
        <div></div>
      </Layout>
    </TableOfContents>

    <CardSectionImages
      heading="Read more about it"
      theme="white"
      cards={[
        {
          image: {
            defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
            alt: 'Image alt text',
          },
          eyebrow: 'Topic',
          heading: 'Natural language processing.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          image: {
            defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
            alt: 'Image alt text',
          },
          eyebrow: 'Blog',
          heading: 'Natural language processing.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          image: {
            defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
            alt: 'Image alt text',
          },
          eyebrow: 'Topic',
          heading: 'Natural language processing.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          image: {
            defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
            alt: 'Image alt text',
          },
          eyebrow: 'Blog',
          heading:
            'Serving society ethically in the age of Artificial Intelligence.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          image: {
            defaultSrc: 'https://dummyimage.com/1056x480/ee5396/161616',
            alt: 'Image alt text',
          },
          eyebrow: 'Topic',
          heading:
            'Serving society ethically in the age of Artificial Intelligence.',
          cta: {
            href: 'https://www.example.com',
          },
        },
      ]}
    />

    <CardSectionSimple
      heading="Aliquam condimentum interdum"
      theme="white"
      cards={[
        {
          heading: 'Nunc convallis lobortis',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          heading: 'Fusce gravida eu arcu',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          heading: 'Interdum et malesuada',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          heading: 'Nunc convallis loborti',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          cta: {
            href: 'https://www.example.com',
          },
        },
        {
          heading: 'Nunc convallis lbortis',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          cta: {
            href: 'https://www.example.com',
          },
        },
      ]}
    />
  </>
);

export default Learn;
