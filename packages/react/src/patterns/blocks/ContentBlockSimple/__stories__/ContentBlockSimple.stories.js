import './index.scss';
import {
  select,
  text,
  withKnobs,
  object,
  boolean,
} from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import { LinkList } from '../../../sub-patterns/LinkList';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|ContentBlockSimple', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const ctaStyles = {
      text: 'text',
      card: 'card',
    };

    const ctaTypes = {
      local: 'local',
      jump: 'jump',
      external: 'external',
    };

    const ctaProps = {
      cta: {
        href: 'https://www.ibm.com',
      },
      style: select('CTA style', ctaStyles, ctaStyles.card),
      type: select('CTA type', ctaTypes, ctaTypes.local),
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

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

    // Render right panels elements
    const showAside = boolean('Render aside elements', false);

    const linkListProps = showAside && {
      heading: text('link list heading:', 'Tutorials'),
      items: object('link list items array', [
        {
          type: 'local',
          copy: 'Containerization A Complete Guide',
          cta: {
            href: 'https://ibm.com',
          },
        },
        {
          type: 'external',
          copy: 'Why should you use microservices and containers',
          cta: {
            href: 'https://ibm.com',
          },
        },
      ]),
    };

    const aside = showAside && {
      items: <LinkList {...linkListProps} />,
      border: boolean('border', false),
    };

    return (
      <div className={'bx--grid'}>
        <div className="bx--row">
          <div
            className={
              showAside
                ? 'bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story'
                : 'bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story'
            }>
            <ContentBlockSimple
              copy={copy}
              heading={text(
                'Heading (required)',
                'Curabitur malesuada varius mi eu posuere'
              )}
              mediaType={mediaType}
              mediaData={mediaData}
              cta={ctaProps}
              aside={aside}
            />
          </div>
        </div>
      </div>
    );
  });
