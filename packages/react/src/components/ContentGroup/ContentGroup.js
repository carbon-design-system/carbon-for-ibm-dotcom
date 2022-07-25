/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { CTA } from '../CTA';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading string
 * @param {string} props.className optional class to be applied to the containing node
 * @param {*} props.cta CTA component props object
 * @returns {*} JSX ContentGroup component
 */
const ContentGroup = ({ children, heading, customClassName, cta, copy }) => {
  const className = classNames(`${prefix}--content-group`, customClassName);

  return (
    <div className={className} data-autoid={`${stablePrefix}--content-group`}>
      <h3
        data-autoid={`${stablePrefix}--content-group__title`}
        className={`${prefix}--content-group__title`}>
        {heading}
      </h3>
      {copy && (
        <div
          className={`${prefix}--content-group__copy`}
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(copy, { bold: false }),
          }}
        />
      )}
      <div
        data-autoid={`${stablePrefix}--content-group__children`}
        className={classNames(
          `${prefix}--content-group__col`,
          `${prefix}--content-group__children`
        )}>
        {children}
      </div>
      {cta && (
        <div
          data-autoid={`${stablePrefix}--content-group__cta`}
          className={`${prefix}--content-group__cta-row`}>
          <CTA customClassName={`${prefix}--content-group__cta`} {...cta} />
        </div>
      )}
    </div>
  );
};

ContentGroup.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  /**
   * Class to be applied to the containing node.
   */
  customClassName: PropTypes.string,

  /**
   * CTA. Allowed style is `card` and type is `local`.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOf(['local']),
    copy: PropTypes.string,
    customClassName: PropTypes.string,
  }),
};

export default ContentGroup;
