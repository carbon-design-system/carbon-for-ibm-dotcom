/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentItem from '../../../internal/components/ContentItem/ContentItem';
import CTASection from '../CTASection';
import { mount } from 'enzyme';
import React from 'react';

// Mocking ResizeObserver to avoid CI error where it appears to be undefined
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const ctaSectionProps = {
  heading: 'Content item heading',
  copy: 'Content item copy',
};

const contentItemsProps = {
  items: [
    {
      heading: 'Get connected',
      copy: `
        IBM DevOps partners have a wide range of expertise.
        Find one to build the right solution for you.
        `,
      cta: {
        copy: 'Find a partner',
        type: 'external',
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
  ],
};

describe('CTA Section', () => {
  it('renders two ContentItems', () => {
    const wrapper = mount(
      <CTASection
        heading={ctaSectionProps.heading}
        copy={ctaSectionProps.copy}
        items={contentItemsProps.items}
      />
    );
    expect(wrapper.find(ContentItem)).toHaveLength(
      contentItemsProps.items.length
    );
  });
});
