import './index.scss';
import { text, object, withKnobs, select } from '@storybook/addon-knobs';
import ContentGroupSimple from '../ContentGroupSimple';
import ContentGroupSimpleKnobs from './data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|Content Group Simple', module)
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
    const cta = object('CTA Data:', ContentGroupSimpleKnobs.cta);

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
            <ContentGroupSimple
              mediaType={mediaType}
              mediaData={mediaData}
              heading={heading}
              items={items}
              cta={cta}
            />
          </div>
        </div>
      </div>
    );
  });
