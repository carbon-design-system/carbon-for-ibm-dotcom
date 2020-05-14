import LeadSpaceBlock from '../LeadSpaceBlock';
import React from 'react';
import { shallow } from 'enzyme';
import {text} from "@storybook/addon-knobs";

describe('LeadSpaceBlock', () => {

  const title = 'Continuous delivery';

  const heading= 'Innovate like a startup and scale for the enterprise';

  const copy = `Automate your software release process`;

  const mediaType = 'video';

  const video = {
    videoId: '0_uka1msg4',
    showDescription: true,
  };

  const image =  {
    sources: [
      {
        src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
        breakpoint: 320,
      },
      {
        src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
        breakpoint: 400,
      },
      {
        src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
        breakpoint: 672,
      },
    ],
    alt: 'Image alt text',
    defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
  };

  const mediaData = mediaType === 'image' ? image : video;

  const linkListProps = {
    heading: text('link list heading:', 'Featured products'),
    items: [
      {
        type: 'local',
        copy: 'IBM Cloud Continuous Delivery',
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: 'local',
        copy: 'UrbanCode',
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: 'local',
        copy: 'View all products',
        cta: {
          href: 'https://ibm.com',
        },
      },
    ],
  };

  const buttonText = 'Contact Sales';

  const wrapper = shallow(<LeadSpaceBlock title={title}
                                          copy={copy}
                                          heading={heading}
                                          mediaType={mediaType}
                                          mediaData={mediaData}
                                          items={linkListProps}
                                          button={buttonText} />);


  it('component renders as expected', () => {
    expect(wrapper.find('.bx--lead-space-block')).toHaveLength(1);
  });

});

