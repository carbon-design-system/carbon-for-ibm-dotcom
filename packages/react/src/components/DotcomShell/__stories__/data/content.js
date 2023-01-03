/**
 * Copyright IBM Corp. 2016, 2022
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
  LeadSpaceBlock,
  LogoGrid,
  FeatureCard,
  TableOfContents,
} from '../../../../index';

import { ArrowRight20 } from '@carbon/icons-react';
import imgLg16x9 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--003.jpg';
import imgLg16x9_2 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgLg1x1 from '../../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgMd16x9 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--003.jpg';
import imgMd16x9_2 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--003.jpg';
import imgSm16x9_2 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgXlg4x3 from '../../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--002.jpg';
import logoAdobe from '../../../../../../storybook-images/assets/logos/logo-adobe.png';
import logoCisco from '../../../../../../storybook-images/assets/logos/logo-cisco.png';
import logoDell from '../../../../../../storybook-images/assets/logos/logo-dell.png';
import logoMicrosoft from '../../../../../../storybook-images/assets/logos/logo-microsoft.png';
import logoRabobank from '../../../../../../storybook-images/assets/logos/logo-rabobank.png';
import logoUsBank from '../../../../../../storybook-images/assets/logos/logo-usbank.png';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * DDS patterns template
 *
 * @returns {*} JSX for Learn template
 */
const Content = ({ withL1 }) => (
  <>
    <TableOfContents
      menuLabel="Jump to"
      theme="white"
      stickyOffset={withL1 ? '96' : '48'}>
      <a name="section-1" data-title="Lorem ipsum dolor sit amet" />
      <LeadSpaceBlock
        title="Lorem ipsum dolor sit amet"
        copy="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        heading="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        mediaType="video"
        mediaData={{
          videoId: '1_9h94wo6b',
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
      <a
        name="section-2"
        data-title="Pharetra pharetra massa massa ultricies mi quis."
      />
      <ContentBlockSegmented
        heading="Pharetra pharetra massa massa ultricies mi quis."
        items={[
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
          },
        ]}
      />
      <FeatureCard
        card={{
          eyebrow: 'scelerisque purus',
          heading: 'Elementum nibh tellus molestie nunc?',
          copy: 'Habitant morbi tristique senectus et netus et malesuada fames. Habitant morbi tristique.',
          cta: {
            href: 'https://example.com',
            icon: {
              src: ArrowRight20,
            },
          },
          image: {
            defaultSrc: imgLg1x1,
            alt: 'Image alt text',
          },
        }}
        size={'large'}
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
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            image: {
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
            },
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy: 'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            image: {
              heading: 'Mauris iaculis eget dolor nec hendrerit.',
              image: {
                sources: [
                  {
                    src: imgSm16x9_2,
                    breakpoint: 320,
                  },
                  {
                    src: imgMd16x9_2,
                    breakpoint: 400,
                  },
                  {
                    src: imgLg16x9_2,
                    breakpoint: 672,
                  },
                ],
                alt: 'Image alt text',
                defaultSrc: imgLg16x9_2,
              },
            },
          },
        ]}
        cta={{
          style: 'card',
          disableImage: true,
          type: 'video',
          media: {
            src: '1_9h94wo6b',
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
          videoId: '1_9h94wo6b',
        }}
      />

      <a name="section-4" data-title="Tincidunt ornare massa" />
      <ContentGroupHorizontal
        heading="Tincidunt ornare massa"
        items={[
          {
            eyebrow: 'Lorem ipsum',
            heading: 'Aliquam condimentum',
            copy: 'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
            cta: {
              heading: 'Aliquam condimentum',
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
            copy: 'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
            cta: {
              heading: 'Aliquam condimentum',
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
            label: 'Microsoft',
            imgSrc: logoMicrosoft,
            altText: 'Microsoft',
          },
          {
            label: 'Dell',
            imgSrc: logoDell,
            altText: 'Dell',
          },
          {
            label: 'Rabobank',
            imgSrc: logoRabobank,
            altText: 'Rabobank',
          },
          {
            label: 'Adobe',
            imgSrc: logoAdobe,
            altText: 'Adobe',
          },
          {
            label: 'US Bank',
            imgSrc: logoUsBank,
            altText: 'US Bank',
          },
          {
            label: 'Cisco',
            imgSrc: logoCisco,
            altText: 'Cisco',
          },
        ]}
      />

      <a name="section-6" data-title="Aliquam condimentum interdum" />
      <ContentBlockCards
        heading="Aliquam condimentum interdum"
        cards={[
          {
            image: {
              defaultSrc: imgXlg4x3,
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
              defaultSrc: imgXlg4x3,
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
              defaultSrc: imgXlg4x3,
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
                copy: 'IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.',
                cta: {
                  copy: 'Find a partner',
                  type: 'local',
                  href: 'https://example.com/',
                },
              },
              {
                heading: 'Learn how',
                copy: 'Dig into more self-directed learning about DevOps methodologies.',
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

Content.propTypes = {
  /**
   * `true` if content is rendered with an L1 on the page
   */
  withL1: PropTypes.bool,
};

export default Content;
