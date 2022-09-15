/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import ContentItemHorizontal from '../ContentItemHorizontal';
import React from 'react';
import readme from '../README.stories.mdx';

const props = () => ({
  eyebrow: text('Eyebrow (eyebrow):', 'Lorem ipsum'),
  heading: text('Heading (heading):', 'Aliquam condimentum'),
  copy: text(
    'Copy (copy):',
    'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.'
  ),
  cta: {
    items: [
      {
        type: select('CTA 1 Type (type):', ['local', 'external'], 'local'),
        copy: text('CTA 1 Copy (copy):', 'Learn more'),
        cta: {
          href: text('CTA 1 Href (cta.href):', 'https://www.ibm.com'),
        },
      },
      {
        type: select('CTA 2 Type (type):', ['local', 'external'], 'external'),
        copy: text('CTA 2 Copy (copy):', 'Microservices and containers'),
        cta: {
          href: text('CTA 2 Href (cta.href):', 'https://www.ibm.com'),
        },
      },
    ],
  },
});

export default {
  title: 'Components/Content item horizontal',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Content item horizontal: Default',
    },
    propsSet: {
      default: {
        ContentItemHorizontal: {
          eyebrow: 'Lorem ipsum',
          heading: 'Aliquam condimentum',
          copy:
            'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <ContentItemHorizontal {...props()} />
        </div>
      </div>
    </div>
  );
};

export const WithMedia = () => {
  return (
    <p>
      This component is maintained in{' '}
      <code>@carbon/ibmdotcom-web-components</code> library with a{' '}
      <a
        className="bx--link"
        target="_blank"
        href="https://www.ibm.com/standards/carbon/web-components/react/?path=/story/components-content-item-horizontal--with-media">
        React wrapper
      </a>
      .
    </p>
  );
};

WithMedia.story = {
  name: 'With media',
  parameters: {
    ...readme.parameters,
    knobs: { ContentItemHorizontal: () => ({}) },
    percy: {
      skip: true,
    },
    proxy: true,
  },
};

export const WithThumbnail = () => {
  return (
    <p>
      This component is maintained in{' '}
      <code>@carbon/ibmdotcom-web-components</code> library with a{' '}
      <a
        className="bx--link"
        target="_blank"
        href="https://www.ibm.com/standards/carbon/web-components/react/?path=/story/components-content-item-horizontal--with-thumbnail">
        React wrapper
      </a>
      .
    </p>
  );
};

WithThumbnail.story = {
  name: 'With thumbnail',
  parameters: {
    ...readme.parameters,
    knobs: { ContentItemHorizontal: () => ({}) },
    percy: {
      skip: true,
    },
    proxy: true,
  },
};
