import React from 'react';
// import Head from 'next/head'
import content from '../content/content';
import '@carbon/ibmdotcom-styles';
import { DotcomShell} from '@carbon/ibmdotcom-react';

/**
 * Initializes the homepage
 */
const langCode = {
  cc: 'cn', lc: 'zh'
}
const Home = () => <DotcomShell navigation="default" langCode={langCode}>{content}</DotcomShell>;

export default Home;
