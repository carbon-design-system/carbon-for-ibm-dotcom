/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, withKnobs, object } from '@storybook/addon-knobs';
import LinkList from '../LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Sub-Patterns)|LinkList',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

const heading = text('Heading (heading):', 'Tutorials');
const headlines = [
  'Learn more',
  'Containerization A Complete Guide',
  'Microservices and containers',
];
const types = ['download', 'local', 'external', 'video'];
const items = [
  {
    type: types[1],
    copy: headlines[0],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[0],
    copy: headlines[1],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[2],
    copy: headlines[2],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[3],
    media: {
      src: '0_uka1msg4',
      type: 'video',
    },
  },
];

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList
            style="card"
            heading={heading}
            items={object('Items array ', items)}
          />
        </div>
      </div>
    </div>
  );
};

export const Horizontal = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <LinkList
            style="horizontal"
            heading={heading}
            items={object('Items array ', [
              {
                type: types[1],
                copy: headlines[0],
                cta: {
                  href: 'https://ibm.com',
                },
              },
              {
                type: types[0],
                copy: headlines[1],
                cta: {
                  href: 'https://ibm.com',
                },
              },
            ])}
          />
        </div>
      </div>
    </div>
  );
};

export const Vertical = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList
            style="vertical"
            heading={heading}
            items={object('Items (items):', items)}
          />
        </div>
      </div>
    </div>
  );
};

export const VerticalWithCards = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList
            style="vertical"
            heading={heading}
            items={object('Items (items):', items)}
          />
          <LinkList
            style="card"
            heading={heading}
            items={object('Items (items):', items)}
          />
        </div>
      </div>
    </div>
  );
};

export const EndOfSection = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LinkList
            style="vertical-end"
            heading={heading}
            items={object('Items (items):', items)}
          />
        </div>
      </div>
    </div>
  );
};
