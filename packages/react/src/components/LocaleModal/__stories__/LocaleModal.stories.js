import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import LocaleModal from '../LocaleModal';
// import readme from '../README.md';

import '../../../../../styles/scss/components/locale-modal/_locale-modal.scss';

storiesOf('Locale Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    // readme: {
    // sidebar: readme,
    // },
  })
  .add('Default', () => {
    return (
      <LocaleModal
        isOpen={true}
        availabilityText="This page is available in the following locations and languages"
        unavailabilityText="This page is unavailable in your preferred location or language"
        placeHolderText="Search"
        labelText="Search"
        headerLabel="United States — English"
        headerTitle="Select your region"
      />
    );
  });
