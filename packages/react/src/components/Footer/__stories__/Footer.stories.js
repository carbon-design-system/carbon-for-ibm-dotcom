import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, object, boolean } from '@storybook/addon-knobs';
import { Footer } from '../';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-legal.json';
import readme from '../README.md';

import './index.scss';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const footerTypeOptions = {
      tall: '',
      short: 'short',
    };

    const navigation = object('custom navigation', {
      footerMenu: footerMenu.data,
      footerThin: footerThin.data,
    });

    let isCustom = boolean('show custom navigation (not a prop)', true);

    return (
      <Footer
        navigation={isCustom && navigation}
        type={select('type', footerTypeOptions, footerTypeOptions.tall)}
      />
    );
  });
