import './index.scss';
import { text, object, withKnobs, select } from '@storybook/addon-knobs';
import ContentGroupSimple from '../ContentGroupSimple';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|Content Group Simple', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Heading', 'Lorem ipsum dolor sit amet');

    const mediaData = object('Media Data:', {
      images: [
        { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
        { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
        { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
      ],
      alt: 'lead space image',
      defaultImage: 'https://picsum.photos/id/2/672/672',
    });

    const types = {
      image: 'image',
    };
    const mediaType = select('Media type:', types, types.image);

    const items = object('Content Items:', [
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
    ]);

    const cta = object('CTA Data:', {
      heading: 'Lorem ipsum dolor',
      href: 'https://www.example.com',
    });

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
            <ContentGroupSimple
              mediaType={mediaType}
              mediaData={mediaData}
              heading={heading}
              items={items}
              cta={cta}
            />
          </div>
        </div>
      </div>
    );
  });
