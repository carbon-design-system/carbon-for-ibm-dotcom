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
    const heading = text(
      'Content Block heading (required)',
      ContentGroupSimpleKnobs.heading
    );
    const mediaData = object('Media Data:', ContentGroupSimpleKnobs.mediaData);
    const mediaType = 'image';
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
    };

    const ctaTypes = {
      external: 'external',
      jump: 'jump',
      local: 'local',
    };

    const ctaProps = {
      title: 'Lorem ipsum dolor sit amet',
      href: 'https://www.ibm.com',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

    const contentGroup = {
      mediaType: { mediaType },
      mediaData: { mediaData },
      heading: { heading },
      items: { items },
      cta: {
        title: 'Lorem ipsum dolor',
        href: 'https://www.example.com',
      },
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockSimple
          copy={select('Copy (required)', copy, copy['single paragraph'])}
          heading={text(
            'Heading (required)',
            'Curabitur malesuada varius mi eu posuere'
          )}
          contentGroup={contentGroup}
          cta={select('Feature Link (optional)', ctaProps, ctaProps)}
          ctaStyle={select('CTA style', ctaStyles, ctaStyles.text)}
          ctaType={select('CTA type', ctaTypes, ctaTypes.default)}
        />
      </div>
    );
  });
