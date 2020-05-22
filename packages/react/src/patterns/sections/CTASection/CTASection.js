/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CTASection pattern
 *
 * @param {object} props props object
 * @param {string} props.heading heading string
 * @param {string} props.copy pattern copy
 * @param {object} props.cta CTA component
 * @param {string} props.theme theme name
 * @ param {Array} props.items CTA items to the ContentItem
 * @returns {object} JSX Object
 */
const CTASection = ({ heading, copy, cta, items, theme }) => {
  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--cta-section--${theme}`;
  };

  return (
    <section
      data-autoid={`${stablePrefix}--cta-section`}
      className={classNames(`${prefix}--cta-section`, _setTheme(theme))}>
      <ContentBlock heading={heading} copy={copy} cta={cta} />
      <hr className={`${prefix}--horizontal-line`} />
      <div className={`${prefix}--helper-wrapper`}>
        <div className={`${prefix}--content-item-wrapper`}>
          {items.map((item, index) => (
            <ContentItem
              key={index}
              heading={item.heading}
              copy={item.copy}
              cta={item.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

CTASection.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
  theme: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        heading: PropTypes.string,
        copy: PropTypes.string,
        cta: PropTypes.object,
      }),
    })
  ),
};

export default CTASection;
