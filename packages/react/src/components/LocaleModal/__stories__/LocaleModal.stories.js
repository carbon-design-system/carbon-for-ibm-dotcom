import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import LocaleModal from '../LocaleModal';
import readme from '../README.md';

import './index.scss';

const localeModalProps = {
  headerLabel: text('label', 'United States — English'),
  headerTitle: text('title', 'Select region'),
};

storiesOf('Locale Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return <LocaleModal isOpen={true} {...localeModalProps} />;
  });
