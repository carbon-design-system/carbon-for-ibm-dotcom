/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Callout from '../../internal/components/Callout/Callout';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import { Quote } from '../Quote';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CalloutQuote component.
 */
const CalloutQuote = ({ quote }) => {
  return (
    <div
      className={`${prefix}--callout-quote`}
      data-autoid={`${stablePrefix}--callout-quote`}>
      <Callout>
        <Quote {...quote} />
      </Callout>
    </div>
  );
};

CalloutQuote.propTypes = {
  /**
   * Quote object.
   * See [`<Quote>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-quote--default#props) for full usage details.
   */
  quote: PropTypes.shape({
    markType: PropTypes.oneOf([
      'doubleCurved',
      'singleCurved',
      'doubleAngle',
      'singleAngle',
      'lowHighReversedDoubleCurved',
    ]),
    copy: PropTypes.string.isRequired,
    source: PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
    }),
    cta: PropTypes.shape({
      copy: PropTypes.string,
      type: PropTypes.oneOf(['local', 'external']),
      href: PropTypes.string,
    }),
    inverse: PropTypes.bool,
  }),
};

export default CalloutQuote;
