import 'carbon-components/css/carbon-components.min.css';
import '@carbon/ibmdotcom-styles/scss/ibm-dotcom-styles.scss';

import App, { Container } from 'next/app';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import React from 'react';

/**
 * Language codes for the DotcomShell for server side render
 */
const langCode = {
  cc: 'us',
  lc: 'en',
};

/**
 * Class IbmdotcomLibrary
 */
export default class IbmdotcomLibrary extends App {
  /**
   * Renders the DotcomShell
   *
   * @returns {*} Page wrapper JSX
   */
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <DotcomShell navigation="default" langCode={langCode}>
          <Component {...pageProps} />
        </DotcomShell>
        <script src="//1.www.s81c.com/common/stats/ibm-common.js"></script>
      </Container>
    );
  }
}
