/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import LeadSpaceBlock from '../LeadSpaceBlock.js';
import React from 'react';
import readme from '../README.stories.mdx';

const image = {
  heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
  videoId: '1_9h94wo6b',
  showCaption: true,
};

const types = ['local', 'external'];

const defaultItems = [
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
    type: 'download',
    copy: 'View all products',
    cta: {
      href: 'https://ibm.com',
    },
  },
];

export default {
  title: 'Components|LeadSpaceBlock',
  parameters: {
    ...readme.parameters,
    knobs: {
      LeadSpaceBlock: ({ groupId }) => {
        return {
          title: 'Continuous delivery',
          copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
          heading: text(
            'Heading (required):',
            'Innovate like a startup and scale for the enterprise ',
            groupId
          ),
          items: {
            heading: text(
              'Link list heading (heading):',
              'Featured products',
              groupId
            ),
            items: defaultItems,
          },
          cta: {
            style: 'button',
            type: 'local',
            buttons: [
              {
                type: select('CTA type (type):', types, types[0], groupId),
                copy: text('CTA copy (copy):', 'Contact sales', groupId),
                href: 'https://example.com/',
              },
            ],
          },
        };
      },
    },
    propsSet: {
      default: {
        LeadSpaceBlock: {
          title: 'Continuous delivery',
          heading: 'Innovate like a startup and scale for the enterprise ',
          items: {
            items: defaultItems,
          },
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { title, copy, heading, items, cta } =
    parameters?.props?.LeadSpaceBlock ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LeadSpaceBlock
            title={title}
            copy={copy}
            heading={heading}
            mediaType="image"
            mediaData={image}
            items={items}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};

export const WithVideo = ({ parameters }) => {
  const { title, copy, heading, items, cta } =
    parameters?.props?.LeadSpaceBlock ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LeadSpaceBlock
            title={title}
            copy={copy}
            heading={heading}
            mediaType="video"
            mediaData={video}
            items={items}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};
