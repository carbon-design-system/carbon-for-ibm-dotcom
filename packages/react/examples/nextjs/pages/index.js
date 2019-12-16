import React from 'react';
// import Head from 'next/head'
import content from '../content/content';
import '@carbon/ibmdotcom-styles/scss/ibm-dotcom-styles.scss';
import { DotcomShell } from '@carbon/ibmdotcom-react';

/**
 * Initializes the homepage
 */
const Home = () => <DotcomShell navigation="default">{content}</DotcomShell>;

export default Home;
