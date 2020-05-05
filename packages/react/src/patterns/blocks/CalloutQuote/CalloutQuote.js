/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Callout, Quote } from '../../sub-patterns';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *
 * @param {object} props Props object
 * @param {object} props.quote Quote object
 * @param {string} props.quote.markType type of the quote marks
 * @param {string} props.quote.copy quote copy
 * @param {object} props.quote.source source object
 * @param {string} props.quote.source.heading name heading for quote source
 * @param {string} props.quote.source.copy title copy for quote source
 * @param {object} props.quote.cta cta props object
 * @param {string} props.quote.cta.copy cta copy
 * @param {string} props.quote.cta.type type 'local' or 'external'
 * @param {string} props.quote.cta.href cta href
 */
const CalloutQuote = ({ quote }) => {
  return (
    <div
      className={`${prefix}--callout-quote`}
      data-autoid={`${stablePrefix}--callout-quote`}>
      <Callout>
        <Quote {...quote} inverse="true" />
      </Callout>
    </div>
  );
};

CalloutQuote.propTypes = {
  quote: PropTypes.instanceOf(Quote),
};

export default CalloutQuote;
