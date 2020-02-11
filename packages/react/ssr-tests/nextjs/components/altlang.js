import altlangs from './data/altlang.json';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Renders the list of altlang items
 *
 * @param {string} host Hostname
 * @returns {Array} altlang elements
 * @private
 */
const _renderAltLangs = host => {
  let langs = [];
  altlangs.forEach(alt => {
    langs.push(
      <link
        rel="alternate"
        hrefLang={`${alt.lc}-${alt.cc}`}
        href={`//${host}?cc=${alt.cc}&lc=${alt.lc}`}
      />
    );
  });
  return langs;
};

/**
 * Altlang elements to include into the head tag
 *
 * @param {string} host hostname
 * @returns {*} altlang markup
 */
const AltLangs = ({ host }) => (
  <>
    <link rel="alternate" hrefLang="x-default" href={`//${host}`} />
    {_renderAltLangs(host)}
  </>
);

AltLangs.propTypes = {
  host: PropTypes.string.isRequired,
};

export default AltLangs;
