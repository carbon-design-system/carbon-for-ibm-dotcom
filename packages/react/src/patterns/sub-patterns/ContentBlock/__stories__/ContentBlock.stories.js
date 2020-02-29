import './index.scss';
import { select, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import ContentBlock from '../ContentBlock';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Sub-Patterns)|ContentBlock', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const blockProps = {
      heading: 'This is the Content Block heading',
      copy: `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      content: `This is the Content Group content.`,
    };

    const ctaProps = {
      style: 'feature',
      type: 'external',
      heading: 'Lorem ipsum dolor sit amet',
      card: {
        cta: {
          href: 'https://www.example.com',
          icon: {
            src: ArrowRight20,
          },
        },
        heading: 'Consectetur adipisicing elit',
        image: {
          defaultSrc: 'https://dummyimage.com/672x672/ee5396/fff&text=1x1',
          alt: 'Image alt text',
        },
      },
    };

    const cta = {
      cta: ctaProps,
      none: null,
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlock
          heading={blockProps.heading}
          copy={blockProps.copy}
          cta={select('CTA (optional)', cta, cta.cta)}
          customClassName={`${prefix}--col-lg-8`}>
          {blockProps.content}
        </ContentBlock>
      </div>
    );
  });
