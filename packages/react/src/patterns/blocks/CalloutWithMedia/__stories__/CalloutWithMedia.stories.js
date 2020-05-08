import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import CalloutWithMedia from '../CalloutWithMedia';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|CalloutWithMedia', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const mediaType = select(
      'mediaType (optional)',
      ['image', 'video', 'none'],
      'image'
    );

    const image = {
      heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

    const video = {
      videoId: '0_uka1msg4',
      showDescription: true,
    };

    const mediaData = mediaType === 'image' ? image : video;

    const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `;

    const heading = text(
      'Heading (required)',
      'Curabitur malesuada varius mi eu posuere'
    );
    const contentblocksimple = {
      copy,
      mediaData,
      mediaType,
      video,
      heading,
    };

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--offset-lg-4 bx--col-lg-12">
            <CalloutWithMedia contentblocksimple={contentblocksimple} />
          </div>
        </div>
      </div>
    );
  });
