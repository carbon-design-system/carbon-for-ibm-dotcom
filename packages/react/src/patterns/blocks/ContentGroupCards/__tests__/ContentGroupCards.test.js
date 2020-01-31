import ContentGroupCards from '../ContentGroupCards';
import { mount } from 'enzyme';
import React from 'react';

describe('<ContentGroupCards />', () => {
  it('renders pattern with 4 cards', () => {
    const items = [
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        cta: {
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        cta: {
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        cta: {
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        cta: {
          href: 'https://www.example.com',
        },
      },
    ];
    const contentgroupcards = mount(
      <ContentGroupCards heading="Lorem ipsum dolor sit amet." items={items} />
    );
    expect(
      contentgroupcards.find('[data-autoid="dds--contentgroupcards-item"]')
    ).toHaveLength(4);
  });
});
