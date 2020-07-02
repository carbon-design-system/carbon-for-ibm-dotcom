/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import {
  CalloutQuote,
  CalloutWithMedia,
  ContentBlockCards,
  ContentBlockSegmented,
  ContentGroupHorizontal,
  CTASection,
  Layout,
  LeadSpaceBlock,
  LogoGrid,
  FeatureCardBlockLarge,
  TableOfContents,
} from '../../../../index';

import { ArrowRight20 } from '@carbon/icons-react';
import React from 'react';

/**
 * DDS patterns template
 *
 * @returns {*} JSX for Learn template
 */
const Content = () => (
  <>
    <TableOfContents menuLabel="Jump to" theme="white">
      <a name="section-1" data-title="Lorem ipsum dolor sit amet" />
      <Layout type="2-1">
        <div>
          <LeadSpaceBlock
            title="Lorem ipsum dolor sit amet"
            copy="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            heading="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
            mediaType="video"
            mediaData={{
              videoId: '0_uka1msg4',
              showDescription: true,
            }}
            items={{
              heading: 'Featured products',
              items: [
                {
                  type: 'local',
                  copy: 'IBM Cloud Continuous Delivery',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
                {
                  type: 'local',
                  copy: 'UrbanCode',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
                {
                  type: 'local',
                  copy: 'View all products',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
              ],
            }}
            cta={{
              style: 'button',
              type: 'local',
              buttons: [
                {
                  type: 'local',
                  copy: 'Excepteur sint occaecat',
                  href: 'https://example.com/',
                },
              ],
            }}
          />
        </div>
        <></>
      </Layout>

      <a
        name="section-2"
        data-title="Pharetra pharetra massa massa ultricies mi quis."
      />
      <ContentBlockSegmented
        heading="Pharetra pharetra massa massa ultricies mi quis."
        items={[
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
          },
        ]}
      />
      <FeatureCardBlockLarge
        eyebrow="scelerisque purus"
        heading="Elementum nibh tellus molestie nunc?"
        copy="Habitant morbi tristique senectus et netus et malesuada fames. Habitant morbi tristique."
        cta={{
          href: 'https://example.com',
          icon: {
            src: ArrowRight20,
          },
        }}
        image={{
          defaultSrc: 'https://dummyimage.com/600x600/ee5396/161616&text=1:1',
          alt: 'Image alt text',
        }}
      />

      <a
        name="section-3"
        data-title="Elementum nibh tellus molestie nunc non"
      />
      <ContentBlockSegmented
        heading="Elementum nibh tellus molestie nunc non."
        items={[
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
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
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
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
          },
        ]}
        cta={{
          style: 'card',
          disableImage: true,
          type: 'video',
          media: {
            src: '0_uka1msg4',
            type: 'video',
          },
        }}
        mediaType="image"
      />

      <CalloutWithMedia
        heading="Mauris ultrices eros in cursus"
        copy="Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada proin libero nunc consequat. In est ante in nibh mauris cursus mattis. Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat est velit egestas dui."
        mediaType="video"
        mediaData={{
          videoId: '0_uka1msg4',
        }}
      />

      <a name="section-4" data-title="Tincidunt ornare massa" />
      <ContentGroupHorizontal
        heading="Tincidunt ornare massa"
        items={[
          {
            eyebrow: 'Lorem ipsum',
            heading: 'Aliquam condimentum',
            copy:
              'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
            cta: {
              items: [
                {
                  type: 'local',
                  copy: 'Link text',
                  href: 'https://example.com',
                },
                {
                  type: 'external',
                  copy: 'External link text',
                  href: 'https://example.com',
                },
              ],
            },
          },
          {
            eyebrow: 'Lorem ipsum',
            heading: 'Aliquam condimentum',
            copy:
              'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
            cta: {
              items: [
                {
                  type: 'local',
                  copy: 'Link text',
                  href: 'https://example.com',
                },
                {
                  type: 'external',
                  copy: 'External link text',
                  href: 'https://example.com',
                },
              ],
            },
          },
        ]}
      />

      <a name="section-5" data-title="Lobortis elementum nibh tellus" />
      <LogoGrid
        heading="Lobortis elementum nibh tellus"
        logosGroup={[
          {
            title: 'Company A',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
          {
            title: 'Company B',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
          {
            title: 'Company C',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
          {
            title: 'Company D',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
          {
            title: 'Company E',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
          {
            title: 'Company F',
            imgSrc: 'https://dummyimage.com/140x140',
            altText: 'Image alt text',
            href: 'http://example.com/',
          },
        ]}
        ctaCopy="Amet justo donec"
        ctaHref="https://www.example.com"
      />

      <a name="section-6" data-title="Aliquam condimentum interdum" />
      <ContentBlockCards
        heading="Aliquam condimentum interdum"
        cards={[
          {
            image: {
              defaultSrc:
                'https://dummyimage.com/1056x792/ee5396/161616%26text=4:3',
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
              defaultSrc:
                'https://dummyimage.com/1056x792/ee5396/161616%26text=4:3',
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
              defaultSrc:
                'https://dummyimage.com/1056x792/ee5396/161616%26text=4:3',
              alt: 'Image alt text',
            },
            eyebrow: 'Topic',
            heading: 'Natural language processing.',
            cta: {
              href: 'https://www.example.com',
            },
          },
        ]}
      />
      <a name="section-7" data-title="Duis aute irure dolor in reprehenderit" />
      <CalloutQuote
        quote={{
          copy: 'Duis aute irure dolor in reprehenderit',
          source: {
            heading: 'Lorem ipsum',
            copy: 'dolor sit amet',
          },
          cta: {
            copy: 'Link with Icon',
            type: 'local',
            href: 'https://example.com',
          },
        }}
      />
    </TableOfContents>
    <div className="bx--grid" style={{ backgroundColor: '#f4f4f4' }}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <CTASection
            theme="g10"
            cta={{
              style: 'button',
              type: 'local',
              buttons: [
                {
                  type: 'local',
                  copy: 'Contact sales',
                  href: 'https://example.com/',
                },
              ],
            }}
            items={[
              {
                heading: 'Get connected',
                copy:
                  'IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.',
                cta: {
                  copy: 'Find a partner',
                  type: 'local',
                  href: 'https://example.com/',
                },
              },
              {
                heading: 'Learn how',
                copy:
                  'Dig into more self-directed learning about DevOps methodologies.',
                cta: {
                  copy: 'Browse tutorials',
                  type: 'local',
                  href: 'https://example.com/',
                },
              },
            ]}
            heading="Take the next step"
            copy="Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs."
          />
        </div>
      </div>
    </div>
  </>
);

export default Content;
