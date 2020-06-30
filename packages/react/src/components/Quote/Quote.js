/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import decodeString from '@carbon/ibmdotcom-utilities/es/utilities/decodeString/decodeString';
import { HorizontalRule } from '../HorizontalRule';
import Launch20 from '@carbon/icons-react/es/launch/20';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Quote Pattern
 *
 * @param {object} props props Object
 * @param {string} props.markType type of the quote marks
 * @param {string} props.copy quote copy
 * @param {object} props.source source object
 * @param {string} props.source.heading name heading for quote source
 * @param {string} props.source.copy title copy for quote source
 * @param {object} props.cta cta props object
 * @param {string} props.cta.copy cta copy
 * @param {string} props.cta.type type 'local' or 'external'
 * @param {string} props.cta.href cta href
 * @param {boolean} props.inverse toggles inverse theme
 * @returns {*} Quote Pattern
 */
const Quote = ({ markType = 'doubleCurved', copy, source, cta, inverse }) => {
  const [decodedCopy, setDecodedCopy] = useState('');

  useEffect(() => {
    setDecodedCopy(decodeString(copy));
  }, [copy]);

  /**
   * Render the Quote copy with the selected quote marks
   *
   * @returns {*} Blockquote with quote marks
   */
  const renderQuote = () => {
    switch (markType) {
      case 'doubleCurved':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>“</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodedCopy}”
            </blockquote>
          </>
        );
      case 'singleCurved':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>‘</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodedCopy}’
            </blockquote>
          </>
        );
      case 'doubleAngle':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>«</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodedCopy}»
            </blockquote>
          </>
        );
      case 'singleAngle':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>‹</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodedCopy}›
            </blockquote>
          </>
        );
      case 'lowHighReversedDoubleCurved':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>„</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodedCopy}“
            </blockquote>
          </>
        );
    }
  };
  return (
    <div
      data-autoid={`${stablePrefix}--quote`}
      className={classnames(`${prefix}--quote`, {
        [`${prefix}--quote__inverse`]: inverse,
      })}>
      <div className={`${prefix}--quote__container`}>
        <div
          className={`${prefix}--quote__wrapper`}
          data-autoid={`${stablePrefix}--quote__copy`}>
          {renderQuote()}
        </div>
        {source && source.heading && source.copy ? (
          <div
            className={`${prefix}--quote__source`}
            data-autoid={`${stablePrefix}--quote__source`}>
            <p className={`${prefix}--quote__source-heading`}>
              {source.heading}
            </p>
            <p className={`${prefix}--quote__source-body`}>{source.copy}</p>
            {source.copy2 && (
              <p className={`${prefix}--quote__source-optional-copy`}>
                {source.copy2}
              </p>
            )}
          </div>
        ) : (
          false
        )}
      </div>
      {cta ? (
        <div className={`${prefix}--quote__footer`}>
          <HorizontalRule />
          <LinkWithIcon href={cta.href}>
            <span>{cta.copy}</span>
            {cta.type === 'local' ? <ArrowRight20 /> : false}
            {cta.type === 'external' ? <Launch20 /> : false}
          </LinkWithIcon>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

Quote.propTypes = {
  /**
   * Type of the quote marks. Choose from:
   *
   * | Name                          | Description |
   * | ----------------------------- | ----------- |
   * | `singleCurved`                | ‘ ’         |
   * | `doubleCurved`                | “ ”         |
   * | `singleAngle`                 | ‹ ›         |
   * | `doubleAngle`                 | « »         |
   * | `lowHighReversedDoubleCurved` | „ “         |
   */
  markType: PropTypes.oneOf([
    'doubleCurved',
    'singleCurved',
    'doubleAngle',
    'singleAngle',
    'lowHighReversedDoubleCurved',
  ]),

  /**
   * Main Quote.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Source object. The structure is:
   *
   * | Name      | Required | Data Type | Default Value | Description                  |
   * | --------- | -------- | --------- | ------------- | ---------------------------- |
   * | `heading` | YES      | String    | null          | Source heading               |
   * | `copy`    | YES      | String    | null          | Source body text             |
   * | `copy2`   | NO       | String    | null          | Optional second line of copy |
   */
  source: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    copy2: PropTypes.string,
  }),

  /**
   * Object with a sub-scheme of CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    copy: PropTypes.string,
    type: PropTypes.oneOf(['local', 'external']),
    href: PropTypes.string,
  }),

  /**
   * `true` to use the invese colors.
   */
  inverse: PropTypes.bool,
};

export default Quote;
