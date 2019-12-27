import './index.scss';

import { select, text, withKnobs } from '@storybook/addon-knobs';

import ContentGroup from '../ContentGroup';
<<<<<<< HEAD
import { DDS_CONTENT_GROUP } from '../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
=======
import readme from '../README.md';
>>>>>>> feat(readme): readme added for the content-group component

if (DDS_CONTENT_GROUP) {
  storiesOf('ContentGroup', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
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
