import LeadSpaceImage from '../LeadSpaceImage';
import { mount } from 'enzyme';
import React from 'react';

describe('<LeadSpaceImage />', () => {
  it('renders expected number of source elements', () => {
    const image = [
      {
        minWidth: 0,
        url: 'https://dummyimage.com/320x370',
      },
      {
        minWidth: 672,
        url: 'https://dummyimage.com/672x400',
      },
      {
        minWidth: 1056,
        url: 'https://dummyimage.com/1056x480',
      },
    ];

    const imageInfo = {
      default: 'https://dummyimage.com/1056x480',
      alt: 'Image alt text',
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
