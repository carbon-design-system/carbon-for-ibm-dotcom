import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import ContentGroupSimple from '../../ContentGroupSimple';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
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
    const heading = text('Heading', ContentGroupSimpleKnobs.heading);
    const mediaData = object('Media Data:', ContentGroupSimpleKnobs.mediaData);
    const types = ContentGroupSimpleKnobs.types;
    const mediaType = select('Media type:', types, types.image);
    const items = object('Content Items:', ContentGroupSimpleKnobs.items);
    const contentGroupSimpleCta = object('CTA Data:', ContentGroupSimpleKnobs.cta);
    const title = text(
      'title (required)',
      'Maecenas Tincidunt Eget Sapien a Pretium'
    );

    const copy = {
      'single paragraph': `Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:`,
      'multiple paragraphs': `   Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      'multiple paragraphs (styled)': `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
    };

    const link = {
      href: 'https://www.ibm.com',
      text: 'Nunc Pulvinar Nisi',
      target: '_blank',
    };

    const themes = {
      g100: 'g100',
      'light (white)': '',
    };

    const linkType = {
      card: 'card',
      iconLink: 'iconLink',
      none: 'none',
    };

    const withBorder = boolean('with border', true);

    const ctaStyles = {
      text: 'card',
      card: 'card',
    };

    const ctaProps = {
      style: select('CTA type', ctaStyles, ctaStyles.text),
      type: 'local',
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit ametttt',
      card: {
        href: 'https://ibm.com',
        title: 'Consectetur adipisicing elit',
        image: {
          defaultImage: 'https://picsum.photos/id/672/672',
          alt: 'featured card image',
        },
      },
    };

    const cta = {
      cta: ctaProps,
      none: null,
    };

    const contentItem = [
      {
        mediaType: {mediaType},
        mediaData: {mediaData},
        heading: {heading},
        items: {items},
        cta: {contentGroupSimpleCta}
      },
      {
        mediaType: {mediaType},
        mediaData: {mediaData},
        heading: {heading},
        items: {items},
        cta: {contentGroupSimpleCta}
      },
    ];

    return (
      <ContentBlockSimple
        copy={select('Copy (required)', copy, copy['single paragraph'])}
        title={title}
        cta={select('Feature Link (optional)', ctaProps, ctaProps)}
        children={contentItem}
      />


    );
  });
