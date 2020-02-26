import './index.scss';
import { object, select, withKnobs, text } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import ContentBlockMedia from '../ContentBlockMedia';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Blocks)|ContentBlockMedia', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const copy = `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `;

    const ctaProps = {
      type: 'local',
      heading: 'Lorem ipsum dolor sit amet',
      card: {
        cta: {
          href: 'https://ibm.com',
          icon: {
            src: ArrowRight20,
          },
        },
        heading: 'Consectetur adipisicing elit',
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

    const simpleHeading = ContentGroupSimpleKnobs.heading;
    const simpleMediaData = ContentGroupSimpleKnobs.mediaData;
    const simpleTypes = ContentGroupSimpleKnobs.types;
    const simpleMediaType = simpleTypes.image;
    const simpleItems = ContentGroupSimpleKnobs.items;
    const simpleCta = ContentGroupSimpleKnobs.cta;

    const items = [
      {
        mediaType: simpleMediaType,
        mediaData: simpleMediaData,
        heading: text('Simple group heading', simpleHeading),
        items: object('Simple group content', simpleItems),
        cta: object('Simple group CTA', simpleCta),
      },
      {
        mediaType: simpleMediaType,
        mediaData: simpleMediaData,
        heading: text('Simple group heading', simpleHeading),
        items: object('Simple group content', simpleItems),
        cta: object('Simple group CTA', simpleCta),
      },
    ];

    return (
      <div className={`${prefix}--grid`}>
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentBlockMedia
              copy={copy}
              heading={text(
                'Heading (required)',
                'Curabitur malesuada varius mi eu posuere'
              )}
              items={items}
              cta={select('Feature Link (optional)', cta, cta.cta)}
            />
          </div>
        </div>
      </div>
    );
  });
