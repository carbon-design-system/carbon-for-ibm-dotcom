import LeadSpaceImage from '../LeadSpaceImage';
import { mount } from 'enzyme';
import React from 'react';

describe('<LeadSpaceImage />', () => {
  it('renders expected number of source elements', () => {
    const image = [
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
    ];

    const imageInfo = {
      default: 'https://picsum.photos/id/1076/1056/480',
      alt: 'lead space image',
    };

    const leadspaceImage = mount(
      <LeadSpaceImage
        images={image}
        defaultImage={imageInfo.default}
        alt={imageInfo.alt}
      />
    );
    expect(leadspaceImage.find('source')).toHaveLength(3);
  });
});
