import 'carbon-components/css/carbon-components.min.css';
import '@carbon/ibmdotcom-styles/scss/ibm-dotcom-styles.scss';

import Altlang from '../components/altlang';
import App from 'next/app';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import Head from 'next/head';
import React from 'react';

/**
 * Language codes for the DotcomShell for server side render
 * @type {{cc: string, lc: string}}
 * @private
 */
const _defaultLang = {
  cc: 'us',
  lc: 'en',
};

/**
 * Class IbmdotcomLibrary
 */
export default class IbmdotcomLibrary extends App {
  /**
   * Loads in the initial query string parameters
   *
   * @param {object} props page props
   * @param {object} props.ctx app context
   * @returns {Promise<{pageProps}>} Returns the pageProps
   */
  static async getInitialProps({ ctx }) {
    let host;

    if (ctx.req) {
      host = ctx.req.headers.host;
    } else {
      host = location.hostname;
    }

    const useLang =
      ctx.query && ctx.query.lc
        ? {
            lc: ctx.query.lc,
            cc: ctx.query.cc,
          }
        : _defaultLang;

    return { useLang, host, query: ctx.query };
  }

  /**
   * Renders the DotcomShell
   *
   * @returns {*} Page wrapper JSX
   */
  render() {
    const { Component, useLang, host, pageProps } = this.props;
    return (
      <>
        <Head>
          <Altlang host={host} />
        </Head>
        <DotcomShell navigation="default" langCode={useLang}>
          <Component {...pageProps} />
        </DotcomShell>
        <script src="//1.www.s81c.com/common/stats/ibm-common.js"></script>
      </>
    );
  }
}
