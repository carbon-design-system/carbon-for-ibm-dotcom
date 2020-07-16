/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlockSegmented from '../ContentBlockSegmented';
import React from 'react';
import { shallow } from 'enzyme';

describe('ContentBlockSegmented', () => {
  it('renders as expected', () => {
    const items = [
      {
        heading: 'Lorem ipsum dolor sit amet.',
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.`,
        cta: {
          type: 'local',
          copy: 'Lorem Ipsum dolor sit',
          href: 'https://example.com',
        },
      },
    ];

    const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`;

    const image = {
      heading: 'Mauris iaculis eget dolor nec hendrerit.',
      image: {
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
      },
    };

    const component = shallow(
      <ContentBlockSegmented
        items={items}
        heading="Lorem ipsum dolor sit amet"
        copy={copy}
        mediaType="image"
        mediaData={image}
      />
    );

    expect(component.find('.bx--content-block-segmented')).toHaveLength(1);
    expect(
      component.find('[data-autoid="dds--content-block-segmented__media"]')
    ).toHaveLength(1);
    expect(
      component.find(
        '[data-autoid="dds--content-block-segmented__content-group"]'
      )
    ).toHaveLength(1);
  });
});
