import './index.scss';
import LocaleModal from '../LocaleModal';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('Components|Locale Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
    percy: {
      skip: true, // TODO: find way to mock location data for percy
    },
  })
  .add('Default', () => {
    return <LocaleModal isOpen={true} />;
  });
