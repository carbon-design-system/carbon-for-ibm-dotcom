import './index.scss';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { Footer } from '../';
import React from 'react';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-legal.json';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Footer', module)
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
