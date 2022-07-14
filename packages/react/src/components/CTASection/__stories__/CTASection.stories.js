/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import CTASection from '../CTASection';
import React from 'react';
import readme from '../README.stories.mdx';

const types = ['local', 'external'];

const props = {
  default: () => ({
    heading: text('ContentBlock | heading:', 'Take the next step'),
    copy: text(
      'ContentBlock | copy:',
      `Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.`
    ),
    cta: {
      style: 'button',
      type: types[0],
      buttons: [
        {
          type: select('ContentBlock | CTA type', types, types[0]),
          copy: 'Secondary button',
          href: 'https://example.com/',
        },
        {
          type: select('ContentBlock | CTA type', types, types[0]),
          copy: 'Primary button',
          href: 'https://example.com/',
        },
      ],
    },
  }),
  WithContentItems: () => ({
    heading: text('Heading (heading):', 'Take the next step'),
    copy: text(
      'Copy (copy):',
      `Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.`
    ),
    cta: {
      style: 'button',
      type: types[0],
      buttons: [
        {
          type: select('CTA (type):', types, types[0]),
          copy: 'Secondary button',
          href: 'https://example.com/',
        },
        {
          type: select('CTA (type):', types, types[0]),
          copy: 'Primary button',
          href: 'https://example.com/',
        },
      ],
    },
    items: contentItemsProps,
  }),
};

const contentItemsProps = [
  {
    heading: 'Get connected',
    copy:
      'IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.',
    cta: {
      copy: 'Find a partner',
      type: types[0],
      href: 'https://example.com/',
    },
  },
  {
    heading: 'Learn how',
    copy: 'IBM DevOps partners have a wide range of expertise',
    cta: {
      copy: 'Browse tutorials',
      type: types[0],
      href: 'https://example.com/',
    },
  },
];

export default {
  title: 'Components/CTA section',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <CTASection {...props.default()} theme={theme} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    propsSet: {
      default: {
        CTASection: {
          items: contentItemsProps,
        },
      },
    },
  },
};

export const WithContentItems = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <CTASection {...props.WithContentItems()} theme={theme} />
        </div>
      </div>
    </div>
  );
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    percy: {
      skip: true,
    },
  },
};
