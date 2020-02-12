import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
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
      text: 'text',
      card: 'card',
    };

    const ctaProps = {
      style: select('CTA type', ctaStyles, ctaStyles.text),
      type: 'local',
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit amet',
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

    return (
      <ContentBlockSimple
        border={withBorder}
        copy={select('Copy (required)', copy, copy['single paragraph'])}
        link={object('link', link)}
        linkType={select('link type', linkType, linkType.none)}
        theme={select('theme', themes, themes.g100)}
        title={title}
        cta={select('Feature Link (optional)', cta, cta.cta)}
      />
    );
  });
