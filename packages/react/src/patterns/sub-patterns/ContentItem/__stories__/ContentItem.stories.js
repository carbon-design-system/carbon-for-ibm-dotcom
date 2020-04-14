import './index.scss';

import { object, text, withKnobs, select } from '@storybook/addon-knobs';
import ContentItem from '../ContentItem';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentItem', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Component title:', 'Lorem ipsum dolor sit amet.');
    const copy = text(
      'Component copy:',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.'
    );

    const types = {
      jump: 'jump',
      local: 'local',
      external: 'external',
    };

    const cta = {
      copy: text('cta.copy', 'Lorem ipsum dolor sit amet'),
      type: select('cta.type', types, types.local),
      href: text('cta.href', 'https://example.com'),
    };

    const image = {
      image: {
        sources: object('Image assets:', [
          {
            src: 'https://dummyimage.com/288x144/ee5396/161616&text=2:1',
            breakpoint: 'sm',
          },
          {
            src: 'https://dummyimage.com/448x224/ee5396/161616&text=2:1',
            breakpoint: 'md',
          },
          {
            src: 'https://dummyimage.com/352x176/ee5396/161616&text=2:1',
            breakpoint: 'lg',
          },
        ]),
        alt: text('alt', 'content item image'),
        defaultSrc: text(
          'default image:',
          'https://dummyimage.com/352x176/ee5396/161616&text=2:1'
        ),
      },
      heading: text('image caption:', 'this is an image caption'),
    };

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentItem
              heading={heading}
              copy={copy}
              image={image}
              cta={cta}
            />
          </div>
        </div>
      </div>
    );
  });
