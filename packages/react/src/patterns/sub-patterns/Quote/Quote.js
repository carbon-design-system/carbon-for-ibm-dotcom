/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20, Launch20 } from '@carbon/icons-react';
import {
  settings as ddsSettings,
  decodeString,
} from '@carbon/ibmdotcom-utilities';
import { HorizontalRule, LinkWithIcon } from '@carbon/ibmdotcom-react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Quote Pattern
 *
 * @param {object} props props Object
 * @param {string} props.markType type of the quote marks
 * @param {string} props.copy quote copy
 * @param {object} props.source source object
 * @param {object} props.source.heading name heading for quote source
 * @param {object} props.source.copy title copy for quote source
 * @param {object} props.cta cta props object
 * @param {object} props.cta.copy cta copy
 * @param {object} props.cta.type type 'local' or 'external'
 * @param {object} props.cta.href cta href
 * @param {boolean} props.inverse toggles inverse theme
 * @returns {*} Quote Pattern
 */
const Quote = ({ markType = 'doubleCurved', copy, source, cta, inverse }) => {
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
              {decodeString(copy)}”
            </blockquote>
          </>
        );
      case 'singleCurved':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>‘</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodeString(copy)}’
            </blockquote>
          </>
        );
      case 'doubleAngle':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>«</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodeString(copy)}»
            </blockquote>
          </>
        );
      case 'singleAngle':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>‹</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodeString(copy)}›
            </blockquote>
          </>
        );
      case 'lowHighReversedDoubleCurved':
        return (
          <>
            <span className={`${prefix}--quote__mark`}>„</span>
            <blockquote className={`${prefix}--quote__copy`}>
              {decodeString(copy)}“
            </blockquote>
          </>
        );
    }
  };
  return (
    <div
      data-autoid={`${stablePrefix}--quote`}
      className={classnames(
        `${prefix}--quote`,
        `${inverse ? `${prefix}--quote__inverse` : ''}`
      )}>
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
              {decodeString(source.heading)}
            </p>
            <p className={`${prefix}--quote__source-body`}>
              {decodeString(source.copy)}
            </p>
          </div>
        ) : (
          false
        )}
      </div>
      {cta ? (
        <div className={`${prefix}--quote__footer`}>
          <HorizontalRule />
          <LinkWithIcon href={cta.href}>
            {cta.copy}
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
  markType: PropTypes.string,
  copy: PropTypes.string.isRequired,
  source: PropTypes.object,
  cta: PropTypes.object,
  inverse: PropTypes.bool,
};

export default Quote;
