/* eslint-disable sort-imports */
import content from '../content/content';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import React from 'react';
import '@carbon/ibmdotcom-styles';

/**
 * Initializes the homepage
 */
const langCode = {
  cc: 'us',
  lc: 'en',
};

/**
 * Homepage
 *
 * @returns {*} JSX for Homepage
 */
const Home = () => (
  <DotcomShell navigation="default" langCode={langCode}>
    {content}
  </DotcomShell>
);

export default Home;
