import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { DDS_SIMPLELONGFORM } from '../../../internal/FeatureFlags';
import React from 'react';
import SimpleLongForm from '../SimpleLongForm';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_SIMPLELONGFORM) {
  storiesOf('Simple Long Form', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'title (required)',
        'Maecenas Tincidunt Eget Sapien a Pretium'
      );

      const copy = text(
        'copy (required)',
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar nisi id libero sagittis laoreet sed
        ut purus. In eu est tellus. Vivamus quis nisi ut nunc facilisis tincidunt. Fusce sodales ante ac sollicitudin
        tristique. Maecenas sit amet metus id risus pulvinar placerat. Vestibulum mattis rutrum pulvinar. Suspendisse
        sed eros non erat semper fermentum at sed massa. Maecenas id sem pellentesque, ultrices leo sit amet,
        tristique odio. Etiam fermentum neque et vehicula volutpat. Curabitur non eros urna. Cras eu dapibus enim.
      `
      );

      const link = {
        href: 'https://www.ibm.com',
        text: 'Nunc Pulvinar Nisi',
        target: '_blank',
      };

      const themes = {
        g100: 'g100',
        'light (white)': '',
      };

      const linkType = {
        cardLink: 'cardLink',
        iconLink: 'iconLink',
        none: 'none',
      };

      const withBorder = boolean('with border', true);

      return (
        <SimpleLongForm
          border={withBorder}
          copy={copy}
          link={object('link', link)}
          linkType={select('link type', linkType, linkType.none)}
          theme={select('theme', themes, themes.g100)}
          title={title}
        />
      );
    });
}
