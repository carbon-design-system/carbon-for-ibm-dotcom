import './index.scss';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Blocks)|ContentBlockSimple', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const mediaData = object('Media Data:', ContentGroupSimpleKnobs.mediaData);
    const types = ContentGroupSimpleKnobs.types;
    const mediaType = select('Media type:', types, types.image);
    const items = object('Content Items:', ContentGroupSimpleKnobs.items);

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

    const ctaStyles = {
      text: 'text',
      card: 'card',
      none: null,
    };

    const ctaTypes = {
      external: 'external',
      jump: 'jump',
      local: 'local',
    };

    const ctaProps = {
      style: select('CTA style', ctaStyles, ctaStyles.text),
      type: select('CTA types', ctaTypes, ctaTypes.local),
      title: 'Lorem ipsum dolor sit amet',
      href: 'https://www.ibm.com',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockSimple
          copy={select('Copy (required)', copy, copy['single paragraph'])}
          heading={text(
            'Heading (required)',
            'Curabitur malesuada varius mi eu posuere'
          )}
          items={items}
          mediaData={mediaData}
          mediaType={mediaType}
          cta={ctaProps}
        />
      </div>
    );
  });
