import './index.scss';
import { select, withKnobs } from '@storybook/addon-knobs';
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
      style: 'card',
      type: 'external',
      copy: 'Lorem ipsum dolor sit amet',
      cta: {
        href: 'https://www.example.com',
      },
    };

    const cta = {
      cta: ctaProps,
      none: null,
    };

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
            <ContentBlock
              heading={blockProps.heading}
              copy={blockProps.copy}
              cta={select('CTA (optional)', cta, cta.cta)}
              customClassName={`${prefix}--content-block-story`}>
              {blockProps.content}
            </ContentBlock>
          </div>
        </div>
      </div>
    );
  });
