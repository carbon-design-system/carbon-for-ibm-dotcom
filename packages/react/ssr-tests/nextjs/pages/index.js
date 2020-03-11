import { CardSectionSimple } from '@carbon/ibmdotcom-react';
import React from 'react';

/**
 * Homepage
 *
 * @returns {*} JSX for Homepage
 */
const Home = () => (
  <CardSectionSimple
    heading="Page Templates"
    theme="white"
    cards={[
      {
        heading: 'Learn',
        copy: ' ',
        cta: {
          href: '/learn',
        },
      },
      {
        heading: 'More coming soon!',
        copy: ' ',
        cta: {
          href: '/learn',
        },
      },
    ]}
  />
);

export default Home;
