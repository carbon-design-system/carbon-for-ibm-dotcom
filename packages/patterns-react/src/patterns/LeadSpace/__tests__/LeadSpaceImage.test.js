import React from 'react';
import { mount } from 'enzyme';
import LeadSpaceImage from '../LeadSpaceImage';

describe('<LeadSpaceImage />', () => {
  it('renders expected number of source elements', () => {
    const image = {
      sources: [
        {
          minWidth: 0,
          url: 'https://picsum.photos/id/1076/320/370',
        },
        {
          minWidth: 672,
          url: 'https://picsum.photos/id/1076/672/400',
        },
        {
          minWidth: 1056,
          url: 'https://picsum.photos/id/1076/1056/480',
        },
      ],
      default: 'https://picsum.photos/id/1076/1056/480',
      alt: 'lead space image',
    };
    const leadspaceImage = mount(<LeadSpaceImage image={image} />);
    expect(leadspaceImage.find('source')).toHaveLength(3);
  });
});
