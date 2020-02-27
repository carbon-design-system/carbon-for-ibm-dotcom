import ContentBlockSegmented from '../ContentBlockSegmented';
import { mount } from 'enzyme';
import React from 'react';

describe('<ContentBlockSegmented />', () => {
  it('renders pattern with 4 content items', () => {
    const heading = 'Lorem ipsum dolor sit amet.';

    const copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const itemsWrong = [
      {
        heading: 'Lorem ipsum dolor sit amet.',
        mediaData: {
          images: [
            {
              src: 'https://dummyimage.com/320x160/ee5396/fff&text=2x1',
              minWidth: 'sm',
            },
            {
              src: 'https://dummyimage.com/400x400/ee5396/fff&text=1x1',
              minWidth: 'md',
            },
            {
              src: 'https://dummyimage.com/672x672/ee5396/fff&text=1x1',
              minWidth: 'lg',
            },
          ],
          defaultImage: 'https://dummyimage.com/672x672/ee5396/fff&text=1x1',
          alt: 'Image alt text',
        },
        mediaType: 'video',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
      },
    ];

    const items = [
      {
        heading: 'Lorem ipsum dolor sit amet.',
        mediaData: {
          images: [
            {
              src: 'https://dummyimage.com/320x160/ee5396/fff&text=2x1',
              minWidth: 'sm',
            },
            {
              src: 'https://dummyimage.com/400x400/ee5396/fff&text=1x1',
              minWidth: 'md',
            },
            {
              src: 'https://dummyimage.com/672x672/ee5396/fff&text=1x1',
              minWidth: 'lg',
            },
          ],
          defaultImage: 'https://dummyimage.com/672x672/ee5396/fff&text=1x1',
          alt: 'Image alt text',
        },
        mediaType: 'image',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          style: 'text',
          type: 'local',
          href: 'https://www.example.com',
          copy: 'Lorem ipsum dolor sit ametttt',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          style: 'card',
          type: 'external',
          title: 'Lorem ipsum dolor',
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        mediaData: {
          images: [
            {
              src: 'https://dummyimage.com/320x180/ee5396/fff&text=16x9',
              minWidth: 'sm',
            },
            {
              src: 'https://dummyimage.com/400x225/ee5396/fff&text=16x9',
              minWidth: 'md',
            },
            {
              src: 'https://dummyimage.com/672x378/ee5396/fff&text=16x9',
              minWidth: 'lg',
            },
          ],
          defaultImage: 'https://dummyimage.com/672x378/ee5396/fff&text=16x9',
          alt: 'Image alt text',
        },
        mediaType: 'image',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          style: 'card',
          type: 'jump',
          title: 'Lorem ipsum dolor',
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
      },
    ];

    const contentblocksegmented = mount(
      <ContentBlockSegmented heading={heading} items={items} copy={copy} />
    );

    expect(
      contentblocksegmented.find('[data-autoid="dds--content-block-segmented"]')
    ).toHaveLength(1);
    expect(
      contentblocksegmented.find(
        '[data-autoid="dds--content-block-segmented__media"]'
      )
    ).toHaveLength(2);
    expect(
      contentblocksegmented.find('[data-autoid="dds--content-item"]')
    ).toHaveLength(4);

    const contentblocksegmented_noimage = mount(
      <ContentBlockSegmented heading={heading} copy={copy} items={items} />
    );
    expect(
      contentblocksegmented_noimage.find(
        '[data-autoid="dds--content-block-segmented__content-group"]'
      )
    ).toHaveLength(4);
    expect(
      contentblocksegmented_noimage.find(
        '[data-autoid="dds--content-block-segmented__media"]'
      )
    ).toHaveLength(2);
    expect(
      contentblocksegmented_noimage.find(
        '[data-autoid="dds--content-block-segmented__content-item"]'
      )
    ).toHaveLength(4);

    const contentblocksegmented_wrongtype = mount(
      <ContentBlockSegmented heading={heading} copy={copy} items={itemsWrong} />
    );
    expect(
      contentblocksegmented_wrongtype.find(
        '[data-autoid="dds--content-block-segmented__content-group"]'
      )
    ).toHaveLength(1);
    expect(
      contentblocksegmented_wrongtype.find(
        '[data-autoid="dds--content-block-segmented__content-group__media"]'
      )
    ).toHaveLength(0);
    expect(
      contentblocksegmented_wrongtype.find(
        '[data-autoid="dds--content-block-segmented__content-item"]'
      )
    ).toHaveLength(1);
  });
});
