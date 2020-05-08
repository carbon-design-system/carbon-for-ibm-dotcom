import './index.scss';
import inPercy from '@percy-io/in-percy';
import localeData from '../__data__/locale-data.json';
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
  })
  .add('Default', () => {
    return (
      <LocaleModal
        isOpen={true}
        localeData={inPercy ? localeData : null}
        localeDisplay={inPercy ? 'United States - English' : null}
      />
    );
  });
