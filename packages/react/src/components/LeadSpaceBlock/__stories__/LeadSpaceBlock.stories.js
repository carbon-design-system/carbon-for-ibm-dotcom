/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import LeadSpaceBlock from '../LeadSpaceBlock.js';
import React from 'react';
import readme from '../README.stories.mdx';

const image = {
  heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

const props = () => ({
  title: 'Continuous delivery',
  copy: `Automate your software release process with continuous delivery (CD)—the most
      critical part of adopting DevOps. Build, test, and deploy code changes quickly,
      ensuring software is always ready for deployment.`,
  heading: text(
    'Heading (required):',
    'Innovate like a startup and scale for the enterprise '
  ),
  items: {
    heading: text('Link list heading (heading):', 'Featured products'),
    items: defaultItems,
  },
  cta: {
    style: 'button',
    type: 'local',
    buttons: [
      {
        type: select('CTA type (type):', types, types[0]),
        copy: text('CTA copy (copy):', 'Contact sales'),
        href: 'https://example.com/',
      },
    ],
  },
});

export default {
  title: 'Components/Lead space block',
  parameters: {
    ...readme.parameters,
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

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LeadSpaceBlock mediaType="image" mediaData={image} {...props()} />
        </div>
      </div>
    </div>
  );
};

export const WithVideo = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LeadSpaceBlock mediaType="video" mediaData={video} {...props()} />
        </div>
      </div>
    </div>
  );
};
