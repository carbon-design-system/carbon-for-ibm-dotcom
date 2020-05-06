import { ContentItem } from '../../../sub-patterns/ContentItem';
import CTASection from '../CTASection';
import { mount } from 'enzyme';
import React from 'react';

const contentItemsProps = [
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
];

describe('CTA Section', () => {
  it('renders two ContentItems', () => {
    const wrapper = mount(<CTASection items={contentItemsProps} />);
    expect(wrapper.find(ContentItem)).toHaveLength(contentItemsProps.length);
  });
});
