import ContentGroupSimple from '../ContentGroupSimple';
import { mount } from 'enzyme';
import React from 'react';

describe('<ContentGroupSimple />', () => {
  it('renders pattern with 4 content-items', () => {
    const heading = 'Lorem ipsum dolor sit amet';

    const mediaData = {
      images: [
        { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
        { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
        { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
      ],
      alt: 'lead space image',
      defaultImage: 'https://picsum.photos/id/2/672/672',
    };

    const mediaType = 'image';

    const items = [
      {
        heading: 'Lorem ipsum dolor sit amet.',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
      },
    ];

    const cta = {
      copy: 'Lorem ipsum dolor',
      href: 'https://www.example.com',
    };

    const contentgroupsimple = mount(
      <ContentGroupSimple
        mediaType={mediaType}
        mediaData={mediaData}
        heading={heading}
        items={items}
        cta={cta}
      />
    );
    expect(
      contentgroupsimple.find('[data-autoid="dds--content-group-simple"]')
    ).toHaveLength(1);
    expect(
      contentgroupsimple.find(
        '[data-autoid="dds--content-group-simple__media"]'
      )
    ).toHaveLength(1);
    expect(
      contentgroupsimple.find('[data-autoid="dds--content-item"]')
    ).toHaveLength(4);

    const contentgroupsimple_noimage = mount(
      <ContentGroupSimple heading={heading} items={items} cta={cta} />
    );
    expect(
      contentgroupsimple_noimage.find(
        '[data-autoid="dds--content-group-simple"]'
      )
    ).toHaveLength(1);
    expect(
      contentgroupsimple_noimage.find(
        '[data-autoid="dds--content-group-simple__media"]'
      )
    ).toHaveLength(0);
    expect(
      contentgroupsimple_noimage.find('[data-autoid="dds--content-item"]')
    ).toHaveLength(4);

    const contentgroupsimple_wrongtype = mount(
      <ContentGroupSimple
        mediaType="wrong"
        mediaData={mediaData}
        heading={heading}
        items={items}
        cta={cta}
      />
    );
    expect(
      contentgroupsimple_wrongtype.find(
        '[data-autoid="dds--content-group-simple"]'
      )
    ).toHaveLength(1);
    expect(
      contentgroupsimple_wrongtype.find(
        '[data-autoid="dds--content-group-simple__media"]'
      )
    ).toHaveLength(0);
    expect(
      contentgroupsimple_wrongtype.find('[data-autoid="dds--content-item"]')
    ).toHaveLength(4);
  });
});
