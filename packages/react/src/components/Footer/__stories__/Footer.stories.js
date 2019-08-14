import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from '../Footer';

// import './footer.scss';
import '../../../../../styles/scss/components/footer/_index.scss';

storiesOf('Footer', module)
  .add('Default / Large', () => <Footer />)
  .add('Small', () => <Footer size="small" />);
