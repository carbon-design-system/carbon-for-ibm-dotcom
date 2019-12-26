import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CONTENT_GROUP } from '../../../internal/FeatureFlags';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import './index.scss';
import ContentGroup from '../ContentGroup';
// import readme from '../README.md';

if (DDS_CONTENT_GROUP) {
  storiesOf('ContentGroup', module)
    .addDecorator(withKnobs)
    // .addParameters({
    //   readme: {
    //     sidebar: readme,
    //   },
    // })
    .add('Default', () => {
      const copy = text(
        'Component title(required):',
        'Lorem ipsum dolor sit amet.'
      );

      const headingTypes = {
        heading4: 'heading-4',
        heading5: 'heading-5',
      };

      const type = select(
        'Component heading type:',
        headingTypes,
        headingTypes.heading4
      );

      return <ContentGroup heading={{ copy, type }} />;
    });
}
