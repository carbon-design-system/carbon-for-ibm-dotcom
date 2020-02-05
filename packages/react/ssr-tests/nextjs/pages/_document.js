import Document, { Head, Main, NextScript } from 'next/document';

/**
 * Default lang code
 * @type {string}
 * @private
 */
const _defaultLang = 'us-en';

/**
 * Custom document for nextjs that includes the lang attribute
 */
export default class MyDocument extends Document {
  /**
   * Loads in the initial query string parameters
   *
   * @param {object} ctx app context
   * @returns {Promise} initial props
   */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { query } = ctx;
    const useLang =
      query && query.lc ? `${query.cc}-${query.lc}` : _defaultLang;

    return { ...initialProps, useLang };
  }

  /**
   * Renders the document
   *
   * @returns {*} Document JSX
   */
  render() {
    const { useLang } = this.props;
    return (
      <html lang={useLang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
