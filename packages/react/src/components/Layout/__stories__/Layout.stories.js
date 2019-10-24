import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from '../Layout';
import readme from '../README.md';
import '../../../../../styles/scss/components/layout/_layout.scss';

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })

  .add('Default', () => {
    return (
      <Layout type="1-3">
        <div class="bx--sticky" sticky={true}>
          ...content
        </div>
        <div>..content</div>
      </Layout>
    );
  });

export default Layout;
