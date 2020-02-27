import './index.scss';
import { text, withKnobs } from '@storybook/addon-knobs';
import LocaleModal from '../LocaleModal';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Locale Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const localeModalProps = {
      headerTitle: text('title', 'Select region'),
      modalClose: 'Close',
    };

    return <LocaleModal isOpen={true} {...localeModalProps} />;
  });
