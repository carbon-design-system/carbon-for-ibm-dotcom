import ContentGroupPictograms from '../ContentGroupPictograms';
import { Desktop } from '@carbon/pictograms-react';
import { mount } from 'enzyme';
import React from 'react';

describe('<ContentGroupPictograms />', () => {
  it('renders pattern with 3 pictogram items', () => {
    const items = [
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'text',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        Pictogram: Desktop,
      },
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'text',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        Pictogram: Desktop,
      },
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'text',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        Pictogram: Desktop,
      },
      {
        heading: 'Aliquam condimentum interdum',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        cta: {
          type: 'text',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor',
        },
        Pictogram: Desktop,
      },
    ];
    const contentgrouppictograms = mount(
      <ContentGroupPictograms
        heading="Lorem ipsum dolor sit amet."
        items={items}
      />
    );
    expect(
      contentgrouppictograms.find('.bx--content-group-pictograms')
    ).toHaveLength(1);
    expect(
      contentgrouppictograms.find('.bx--content-group-pictograms__item')
    ).toHaveLength(4);
  });
});
